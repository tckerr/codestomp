import {Moment} from 'moment';

export class Tick {
   public $effectiveTime: number;

   constructor(public index: number,
               public date: Moment,
               public msElapsed: number,
               public msSinceLastTick: number,
               public msOverlap: number,) {
      //this.$effectiveTime = this.$calc(date, msElapsed);
   }

   // private $calc(endDate: Moment, msElapsed) {
   //    let startDate = endDate.subtract(msElapsed, 'ms');
   //
   //    let startDayMs = this.msElapsedInDate(startDate);
   //    let endDayMs = this.msElapsedInDate(endDate);
   //    let totalDays = Math.floor(endDate.diff(startDate, 'days'));
   //
   //    let valueForStartDayMs = this.calcPartialDay(startDayMs);
   //    let valueForEndDayMs = this.calcPartialDay(endDayMs);
   //    let valueForFullDays = this.calcFullDays(totalDays);
   //
   //    return valueForEndDayMs + valueForFullDays + valueForStartDayMs;
   // }
   //
   // private msElapsedInDate(startDate: Moment): number {
   //    return startDate.milliseconds() + 1000 * (startDate.seconds() + 60 * (startDate.minutes() + 60 * startDate.hours()));
   // }
   //
   // private calcFullDays(totalDays: number): number {
   //    return .64 * Math.PI * totalDays;
   // }
   //
   // private calcPartialDay(startDayMs: number): number {
   //    let mappedDistance = (1.6 * startDayMs)/86400000;
   //    let angle = 2 * Math.acos(.8/mappedDistance);
   //    let fullArea = .32 * ( (Math.PI * angle / 180) - Math.sin(angle));
   //    return fullArea / 2;
   // }
//
//    function calc(endDate, msElapsed){
//   let startDate = moment(endDate).subtract(msElapsed, 'ms');
//
//   let startDayMs = 86400000 - (msElapsedInDate(startDate));
//   let endDayMs = msElapsedInDate(endDate);
//   console.log("startDayMs", startDayMs);
//
//   console.log("endDayMs", endDayMs);
//   let totalDays = Math.floor(endDate.diff(startDate, 'days'));
//    console.log("totalDays", totalDays);
//
//   let valueForStartDayMs = startDayMs == 86400000 ? 0 : calcPartialDay(startDayMs);
//   let valueForEndDayMs = calcPartialDay(endDayMs);
//   let valueForFullDays = calcFullDays(totalDays);
//
//   return valueForEndDayMs + valueForFullDays + valueForStartDayMs;
// }
//
// function msElapsedInDate(date) {
//   let val = date.milliseconds() + 1000 * (date.seconds() + 60 * (date.minutes() + 60 * date.hours()));
//   //console.log("msElapsedInDate", startDate.format(), val);
//   return val;
// }
//
// function calcFullDays(totalDays){
//   let val = Math.floor(0.64 * Math.PI * totalDays/2);
//   //console.log("calcFullDays", totalDays, val);
//   return val;
// }
//
// function calcPartialDay(startDayMs){
//   if(startDayMs === 0)
//     return 0;
//   let mappedDistance = (1.6 * startDayMs)/86400000;
//   let gt = mappedDistance >= 0.8;
//   mappedDistance = Math.abs(0.8-mappedDistance)
//   let angle = Math.acos(mappedDistance/0.8) * 57.2958;
//   if(angle > 90)
//   	console.error(angle)
//   let fullArea = 0.32 * ( (Math.PI * angle / 180) - Math.sin(angle));
//   let val = Math.abs(fullArea / 2);
//
//   console.log("fullArea", fullArea);
//   console.log("mappedDistance", mappedDistance);
//   console.log("angle", angle);
//   console.log("calcPartialDay", startDayMs, val);
//   val = gt ? val + (.25*Math.PI*.64) : val;
//   return val;
// }
//
// var msInDay = 86400000;
// var startDate = moment('1970-12-12T00:00:00');
// //var endDate = moment('12-13-1970T00:00:00');
// console.clear()
// console.log(calc(startDate, msInDay * 3.5));
}
