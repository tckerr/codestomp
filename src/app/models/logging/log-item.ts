import {LogType} from '../definitions/log-type';
export class LogItem {
   constructor(public id: string,
               public message: string,
               public logType: LogType) {
   }
}
