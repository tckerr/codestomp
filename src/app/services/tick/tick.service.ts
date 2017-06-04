import {Injectable} from '@angular/core';
import {Pipeline} from '../pipeline';
import {Subject} from 'rxjs/Subject';
import {Tick} from '../../models/tick/tick';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/timer';
import {environment, hour, second} from '../../../environments/environment';
import {Subscription} from 'rxjs/Subscription';
import * as moment from 'moment';
import {GameStorageService} from '../persistence/game-storage.service';

@Injectable()
export class TickService implements Pipeline {
   public msBetweenTicks: number;
   public msPerTick: number;
   private subscription: Subscription;
   private timer: Observable<number>;
   private source = new Subject<Tick>();
   public pipeline = this.source.asObservable();
   private minimumMsBetweenTicks: number;
   private speedMultiplier: number;
   private incrementingSub: Subscription;
   private latest: moment.Moment;
   private msPerTickCached: number;
   private originalSpeedMultiplier: number;
   private speedChangeDelta: number;
   private tpsIncrementDelta: number;

   constructor(private gameStorageService: GameStorageService) {
      this.initialize();
   }

   public initialize() {
      // "frame rate" of the game
      this.tpsIncrementDelta = 1.1;
      this.msBetweenTicks = second/50; // 50 per second
      this.minimumMsBetweenTicks = 20; // this is a performance consideration, since we have at least 2ms overhead
      // this is the fundamental time constant
      // which essentially controls game tick > date speed
      this.speedMultiplier = 1 / second;
      this.originalSpeedMultiplier = this.speedMultiplier;
      this.speedChangeDelta = .001;
      this.setNewSpeed();
   }

   start(offset: number = 0) {
      this.stop();
      this.timer = Observable.timer(offset - moment().diff(this.latest, 'ms'), this.msBetweenTicks);
      this.msPerTickCached = this.msPerTick;
      this.subscription = this.timer.subscribe(() => this.generateTick(this.msPerTickCached, this.msBetweenTicks));
   }

   step() {
      this.generateTick(this.msPerTickCached, this.msBetweenTicks);
   }

   continueWithUpdates() {
      this.incrementingSub && this.incrementingSub.unsubscribe();
      let cachedInterval = this.msBetweenTicks;
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
      let newValue = Math.max(this.minimumMsBetweenTicks, this.msBetweenTicks / this.tpsIncrementDelta);
      this.setNewTps(newValue);
      this.continueWithUpdates();
   }

   decreaseTps() {
      let newValue = this.msBetweenTicks * 1.1;
      this.setNewTps(newValue);
      this.continueWithUpdates();
   }

   private setNewTps(newValue: number) {
      this.msBetweenTicks = newValue;
      this.setNewSpeed();
   }

   private setNewSpeed() {
      this.msPerTick = hour * this.speedMultiplier * this.msBetweenTicks;
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
      this.speedMultiplier = this.originalSpeedMultiplier;
      this.setNewSpeed();
      this.continueWithUpdates();
   }

   public get paused() {
      return !this.subscription || this.subscription.closed;
   }

   public get speed() {
      return this.speedMultiplier / this.speedChangeDelta;
   }

   public get tps() {
      return Math.round(100000 / this.msBetweenTicks) / 100;
   }

   private generateTick(tickToMsMapCached, interval) {
      let index = this.incrementIndex();
      let date = this.generateDate(tickToMsMapCached);
      let msSinceLastTick = 0;
      if (this.latest)
         msSinceLastTick = moment().diff(this.latest, 'ms');
      let msOverlap = msSinceLastTick - interval;
      let tick = new Tick(index, date, tickToMsMapCached, msSinceLastTick, msOverlap);
      this.latest = moment();
      this.source.next(tick);
   }

   private incrementIndex() {
      this.gameStorageService.game.tick++;
      return this.gameStorageService.game.tick;
   }

   private generateDate(tickToMsMapCached) {
      let durationCtor = {};
      durationCtor['ms'] = tickToMsMapCached;
      let newDate = moment(this.gameStorageService.game.time).add(durationCtor);
      this.gameStorageService.game.time = newDate.format();
      return newDate;
   }
}
