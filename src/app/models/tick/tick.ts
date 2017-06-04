import {Moment} from 'moment';
export class Tick {
   constructor(public index: number,
               public date: Moment,
               public msElapsed: number,
               public msSinceLastTick: number,
               public msOverlap: number,) {
   }
}
