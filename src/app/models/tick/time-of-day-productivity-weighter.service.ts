import {Injectable} from '@angular/core';
import * as moment from 'moment';

@Injectable()
export class TimeOfDayProductivityWeighterService {

   private msInDay = 86400000;

   constructor() {   }

   public getWeightedMs(endTime: moment.Moment, msElapsed: number): number  {
      let startTime = moment(endTime).subtract(msElapsed, 'ms');
      let startTimeMs = this.msElapsedInDate(startTime);
      let startTimeElapsedMs = this.msInDay - startTimeMs;
      let endTimeElapsedMs = this.msElapsedInDate(endTime);

      let fullDays = (msElapsed - startTimeElapsedMs - endTimeElapsedMs) / this.msInDay;
      let leadingPortion = this.effectiveWorkTimeForDay(startTimeMs, startTimeElapsedMs);
      let trailingPortion = this.effectiveWorkTimeForDay(0, endTimeElapsedMs);
      return this.msInDay * (leadingPortion + fullDays + trailingPortion);
   }

   private msElapsedInDate(date: moment.Moment): number  {
      return date.milliseconds() + 1000 * (date.seconds() + 60 * (date.minutes() + 60 * date.hours()));
   }

   private effectiveWorkTimeForDay(startMs: number, elapsedMs: number): number {
      if (elapsedMs === 0)
         return 0;
      let normalizedStartMs = startMs / this.msInDay;
      let normalizedElapsedMs = elapsedMs / this.msInDay;
      let priorToStart = this.getValueForDurationNormal(normalizedStartMs);
      let untilEndOfElapsed = this.getValueForDurationNormal(normalizedStartMs + normalizedElapsedMs);
      return untilEndOfElapsed - priorToStart;
   }

   private getValueForDurationNormal(ms): number  {
      if (ms === 0)
         return 0;
      return ms + Math.sin(2 * Math.PI * ms - Math.PI) / (2 * Math.PI);
   }
}
