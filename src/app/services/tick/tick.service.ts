import {Injectable} from '@angular/core';
import {Pipeline} from '../interfaces/pipeline';
import {Subject} from 'rxjs/Subject';
import {Tick} from '../../models/tick';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/timer';
import {environment} from '../../../environments/environment';
import {Subscription} from 'rxjs/Subscription';
import * as moment from 'moment';
import {GameStorageService} from '../game-storage.service';
import {LoggerService} from '../logger-service';

@Injectable()
export class TickService implements Pipeline {
   public tickerIntervalMs: number;
   public ticksPerHour: number;
   public tickToMsMap: number;
   private subscription: Subscription;
   private timer: Observable<number>;
   private source = new Subject<Tick>();
   public pipeline = this.source.asObservable();
   private intervalIncrementDelta: number;
   private minimumInterval: number;
   private speedMultiplier: number;
   private msInAnHour: number;
   private incrementingSub: Subscription;
   private latest: moment.Moment;
   private tickToMsMapCached: number;

   constructor(private gameStorageService: GameStorageService) {
      this.tickerIntervalMs = environment.gameSettings.ticker.defaultIntervalMs;
      this.intervalIncrementDelta = environment.gameSettings.ticker.intervalIncrementDelta;
      this.minimumInterval = environment.gameSettings.ticker.minimumInterval;
      this.speedMultiplier = environment.gameSettings.ticker.speedMultiplier;
      this.msInAnHour = environment.gameSettings.ticker.msInAnHour;
      this.tickToMsMap = environment.gameSettings.ticker.tickToMsMap;
   }

   start(offset: number = 0) {
      this.stop();
      this.timer = Observable.timer(offset - moment().diff(this.latest, 'ms'), this.tickerIntervalMs);
      this.tickToMsMapCached = this.tickToMsMap;
      this.subscription = this.timer.subscribe(() => this.generateTick(this.tickToMsMapCached));
   }

   step(){
      this.generateTick(this.tickToMsMapCached);
   }

   continueWithUpdates(){
      this.incrementingSub && this.incrementingSub.unsubscribe();
      let cachedInterval = this.tickerIntervalMs;
      this.incrementingSub = this.timer.take(1).subscribe(() => {
         if (!this.paused)
            this.start(cachedInterval);
      })
   }

   stop() {
      if (this.subscription)
         this.subscription.unsubscribe();
   }

   increaseTps() {
      let newValue = Math.max(this.minimumInterval, this.tickerIntervalMs - this.intervalIncrementDelta);
      this.setNewTps(newValue);
      this.continueWithUpdates();
   }

   decreaseTps() {
      let newValue = this.tickerIntervalMs + this.intervalIncrementDelta;
      this.setNewTps(newValue);
      this.continueWithUpdates();
   }

   private setNewTps(newValue: number) {
      this.tickerIntervalMs = newValue;
      this.setNewSpeed();
   }

   private setNewSpeed() {
      this.tickToMsMap = this.msInAnHour * this.speedMultiplier * this.tickerIntervalMs;
      this.ticksPerHour = this.msInAnHour / this.tickToMsMap;
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
      this.speedMultiplier = environment.gameSettings.ticker.speedMultiplier;
      this.setNewSpeed();
      this.continueWithUpdates();
   }

   public get paused() {
      return !this.subscription || this.subscription.closed;
   }

   public get speed() {
      return this.speedMultiplier / environment.gameSettings.ticker.speedDelta;
   }

   public get tps() {
      return Math.round(100000 / this.tickerIntervalMs) / 100;
   }

   private generateTick(tickToMsMapCached) {
      let index = this.incrementIndex();
      let date = this.generateDate(tickToMsMapCached);
      let tick = new Tick(index, date, tickToMsMapCached);
      if(this.latest){
         //console.log("Time since last tick:", moment().diff(this.latest, 'ms'))
      }
      this.latest = moment();
      this.source.next(tick);
   }

   private incrementIndex() {
      this.gameStorageService.game.tick++;
      return this.gameStorageService.game.tick;
   }

   private generateDate(tickToMsMapCached) {
      let durationCtor = {};
      durationCtor["ms"] = tickToMsMapCached;
      let newDate = moment(this.gameStorageService.game.time).add(durationCtor);
      this.gameStorageService.game.time = newDate.format();
      return newDate;
   }
}
