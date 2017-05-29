import {LogType} from '../../services/logger-service';
export class LogItem {
   constructor(public id: string,
               public message: string,
               public logType: LogType) {
   }
}
