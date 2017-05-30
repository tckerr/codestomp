import {LogType} from '../services/logger-service';

export enum SpecialEventDisplayType {
   Modal,
   Notification
}

export class SpecialEvent {

   constructor(public eventName: string,
               public description: string,
               public buttonText: string,
               public logType: LogType,
               public displayType: SpecialEventDisplayType) {
   }

   public get isModal() {
      return this.displayType == SpecialEventDisplayType.Modal;
   }

   public get isNotification() {
      return this.displayType == SpecialEventDisplayType.Notification;
   }
}
