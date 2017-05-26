import { Injectable } from '@angular/core';
import {OnToggle} from "./on-toggle";
import {Observable} from "rxjs/Observable";
import {Subject} from "rxjs/Subject";
import * as moment from "moment";
import {Subscription} from "rxjs/Subscription";
import "rxjs/add/observable/timer";
import {Moment} from "moment";

@Injectable()
export class DateService implements OnToggle {

   private moment = moment();
   private source = new Subject<Moment>();
   public pipeline = this.source.asObservable();
   private timer = Observable.timer(0, 100);
   private subscription: Subscription;

   private incrementDate(): void {
      this.moment.add(1, "hours");
      console.log(this.moment);
      this.source.next(this.moment);
   }

   start() {
      this.subscription = this.timer
         .subscribe(() => this.incrementDate());
   }

   stop() {
      this.subscription.unsubscribe();
   }

}
