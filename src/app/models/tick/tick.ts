import * as moment from 'moment';

export class Tick {
   constructor(public index: number,
               public date: moment.Moment,
               public msElapsed: number,
               public msSinceLastTick: number,
               public msOverlap: number,
               public weightedMs: number,
   ) {
   }

}
