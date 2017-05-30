import { Injectable } from '@angular/core';
import * as alertifyjs from 'alertifyjs'
import {LoggerService, LogType} from '../../logger-service';

@Injectable()
export class NotificationService {

  constructor(private logger: LoggerService) {
     alertifyjs.set('notifier', 'position', 'bottom-left');
  }

  public notify(title: string, description: string, logType: LogType = LogType.Error) {
      this.logger.gameLog(`${title}: ${description}`, logType);
      this.fireNotification(title, description, logType)
   }

   private fireNotification(title: string, description: string, logType: LogType) {
      let notifyMethod = this.getNotificationMethod(logType);
      notifyMethod(`
         <div class="p-1 small">
            <strong>${title}</strong>
         </div>
         <div class="p-1 small">${description}</div>
      `);
   }

   private getNotificationMethod(logType: LogType){
     switch (logType){
        case LogType.Error:
           return alertifyjs.error;
        case LogType.Warning:
           return alertifyjs.warning;
        case LogType.Info:
           return alertifyjs.message;
        case LogType.Success:
           return alertifyjs.success;
        default:
           return alertifyjs.message;
     }
   }

}
