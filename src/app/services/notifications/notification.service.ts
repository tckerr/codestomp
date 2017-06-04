import {Injectable, OnDestroy} from '@angular/core';
import * as alertifyjs from 'alertifyjs';
import {LoggerService} from '../../logging/logger-service';
import {LogType} from '../../models/definitions/log-type';
import {GameStorageService} from '../../persistence/game-storage.service';
import {Subscription} from 'rxjs/Subscription';
import {Notification} from '../../models/messaging/notification';

@Injectable()
export class NotificationService implements OnDestroy {
   private sub: Subscription;

   constructor(private logger: LoggerService, private gameStorageService: GameStorageService) {
      alertifyjs.set('notifier', 'position', 'bottom-left');
      this.sub = this.gameStorageService.loadedPipeline.subscribe(() => this.clearAll());
   }

   ngOnDestroy(): void {
      if (this.sub) {
         this.sub.unsubscribe();
      }
   }

   public composeAndSend(title: string, description: string, logType: LogType = LogType.Error) {
      this.logger.gameLog(`${title}: ${description}`, logType);
      this.fireNotification(title, description, logType)
   }

   public send(notification: Notification) {
      this.composeAndSend(notification.title, notification.message, notification.logType);
   }

   public clearAll() {
      alertifyjs.dismissAll();
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

   private getNotificationMethod(logType: LogType) {
      switch (logType) {
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
