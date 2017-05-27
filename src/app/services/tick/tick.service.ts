import { Injectable } from '@angular/core';
import {Pipeline} from "../interfaces/pipeline";
import {Subject} from "rxjs/Subject";
import {Tick} from "../../models/tick";
import {Observable} from "rxjs/Observable";
import "rxjs/add/observable/timer";
import {environment} from "../../../environments/environment";
import {Subscription} from "rxjs/Subscription";
import {Moment, parseZone} from "moment";
import {GameStorageService} from "../game-storage.service";
import {LoggerService} from '../logger-service';

@Injectable()
export class TickService implements Pipeline {
   private tickerIntervalMs: number;
   private subscription: Subscription;
   private timer: Observable<number>;
   private baseDate: Moment;
   private timeUnit: string;
   private source = new Subject<Tick>();
   public pipeline = this.source.asObservable();

   constructor(private gameStorageService: GameStorageService,
   private logger: LoggerService){
      this.tickerIntervalMs = environment.gameSettings.ticker.intervalMs;
      this.timeUnit = environment.gameSettings.ticker.timeUnit;
      this.baseDate = parseZone(environment.gameSettings.startTime);
   }

   start() {
      this.stop();
      this.timer = Observable.timer(0, this.tickerIntervalMs);
      this.subscription = this.timer.subscribe(() => this.generateTick());
   }

   stop() {
      if(this.subscription)
         this.subscription.unsubscribe();
   }

   public get paused(){
      return this.subscription.closed;
   }

   private generateTick() {
      let index = this.incrementIndex();
      let date = this.generateDate(index);
      let tick = new Tick(index, date);
      this.logger.log(tick);
      this.logger.gameLog(tick.index, tick.date.format("LLL"));
      this.source.next(tick);
   }

   private incrementIndex(){
      this.gameStorageService.game.tick++;
      return this.gameStorageService.game.tick;
   }

   private generateDate(index: number){
      let durationCtor = {};
      durationCtor[this.timeUnit] = index;
      console.log("Hours:", index)
      let tempDate = Object.assign(this.baseDate);
      return tempDate.add(durationCtor);
   }
}
