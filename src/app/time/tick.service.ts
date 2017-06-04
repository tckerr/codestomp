import {Injectable} from '@angular/core';
import {Pipeline} from '../services/pipeline';
import {Subject} from 'rxjs/Subject';
import {Tick} from '../models/tick/tick';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/timer';
import {Subscription} from 'rxjs/Subscription';
import * as moment from 'moment';
import {GameStorageService} from '../persistence/game-storage.service';
import {ConfigurationService} from '../configuration/configuration.service';

@Injectable()
export class TickService implements Pipeline {
   private subscription: Subscription;
   private timer: Observable<number>;
   private source = new Subject<Tick>();
   private speedMultiplier: number;
   private incrementingSub: Subscription;
   private latest: moment.Moment;
   private cachedIntervalMultiplier: number;
   private timeGeneratedPerTick: number;

   public pipeline = this.source.asObservable();
   public tps: number;

   constructor(private gameStorageService: GameStorageService,
               private config: ConfigurationService) {
      this.initialize();
   }

   public initialize() {
      this.tps = this.config.INITIAL_TPS;
      this.speedMultiplier = this.config.INITIAL_SPEED_MULTIPLIER;
      this.setNewSpeed();
   }

   private get interval() {
      return 1000 / this.tps;
   }

   start(offset: number = 0) {
      this.stop();
      this.timer = Observable.timer(offset - moment().diff(this.latest, 'ms'), this.interval);
      this.cachedIntervalMultiplier = this.speedMultiplier / this.tps;
      this.subscription = this.timer.subscribe(() => this.generateTick(this.cachedIntervalMultiplier, this.interval));
   }

   step() {
      this.generateTick(this.cachedIntervalMultiplier, this.interval);
   }

   continueWithUpdates() {
      this.incrementingSub && this.incrementingSub.unsubscribe();
      let cachedInterval = this.interval;
      this.incrementingSub = this.timer.take(1).subscribe(() => {
         if (!this.paused)
            this.start(cachedInterval);
      })
   }

   stop() {
      if (this.subscription)
         this.subscription.unsubscribe();
   }

   flush() {
      this.stop();
      this.initialize();
   }


   increaseTps() {
      let newValue = Math.min(this.config.MAX_TPS, this.tps * this.config.TPS_INCREMENT_MULTIPLIER);
      this.setNewTps(newValue);
      this.continueWithUpdates();
   }

   decreaseTps() {
      let newValue = this.tps / 1.1;
      this.setNewTps(newValue);
      this.continueWithUpdates();
   }

   private setNewTps(newValue: number) {
      this.tps = newValue;
      this.setNewSpeed();
   }


   private setNewSpeed() {
      this.timeGeneratedPerTick = this.config.GAME_TIME_ELAPSED_PER_SECOND * this.speedMultiplier / this.tps;
   }

   faster() {
      this.speedMultiplier *= 2;
      this.setNewSpeed();
      this.continueWithUpdates();
   }

   slower() {
      this.speedMultiplier /= 2;
      this.setNewSpeed();
      this.continueWithUpdates();
   }

   resetSpeed() {
      this.speedMultiplier = this.config.INITIAL_SPEED_MULTIPLIER;
      this.setNewSpeed();
      this.continueWithUpdates();
   }

   public get paused() {
      return !this.subscription || this.subscription.closed;
   }

   public get speed() {
      return this.speedMultiplier;
   }

   private generateTick(cachedIntervalMultiplier, interval) {
      let elapsedMs = this.config.GAME_TIME_ELAPSED_PER_SECOND * cachedIntervalMultiplier;
      let index = this.incrementIndex();
      let date = this.generateDate(elapsedMs);
      let msSinceLastTick = 0;
      if (this.latest)
         msSinceLastTick = moment().diff(this.latest, 'ms');
      let msOverlap = msSinceLastTick - interval;
      let tick = new Tick(index, date, elapsedMs, msSinceLastTick, msOverlap);
      this.latest = moment();
      this.source.next(tick);
   }

   private incrementIndex() {
      this.gameStorageService.game.tick++;
      return this.gameStorageService.game.tick;
   }

   private generateDate(elapsedMs) {
      let durationCtor = {};
      durationCtor['ms'] = elapsedMs;
      let newDate = moment(this.gameStorageService.game.time).add(durationCtor);
      this.gameStorageService.game.time = newDate.format();
      return newDate;
   }
}
