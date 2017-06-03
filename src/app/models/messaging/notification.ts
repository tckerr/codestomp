import {LogType} from '../definitions/log-type';

export class Notification {
   public title: string;
   public message: string;
   public logType: LogType;
         
   constructor(json: any) {
      this.title = json.title;
      this.message = json.message;
      this.logType = json.logType;
   }
}
