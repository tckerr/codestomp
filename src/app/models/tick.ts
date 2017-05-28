import {Moment} from 'moment';
export class Tick {
   public hoursElapsed: number;
   constructor(public index: number,
               public date: Moment,
               public msElapsed: number) {
      this.hoursElapsed = msElapsed/3600000;
   }
}
