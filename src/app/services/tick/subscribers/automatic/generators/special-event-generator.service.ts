import {Injectable} from '@angular/core';
import {DeploymentExecutor} from '../../manual/deployment-executor.service';
import {CustomerService} from '../../../../resource-services/customer.service';
import {Subject} from 'rxjs/Subject';
import {SpecialEvent, SpecialEventDisplayType} from '../../../../../models/messaging/special-event';
import {NotificationService} from '../../../../notifications/notification.service';
import {GameStorageService} from '../../../../persistence/game-storage.service';
import {LogType} from '../../../../../models/definitions/log-type';
import {ITickSubscriber} from '../i-tick-subscriber';
import {TickService} from 'app/services/tick/tick.service';
import {TickSubscriberBase} from '../tick-subscriber-base';
import {Subscription} from 'rxjs/Subscription';
import {ConfigurationService} from '../../../../config/configuration.service';

@Injectable()
export class SpecialEventGeneratorService extends TickSubscriberBase implements ITickSubscriber {

   private source = new Subject<SpecialEvent>();
   public pipeline = this.source.asObservable();
   private notificationSub: Subscription;
   private deploymentSub: Subscription;

   // TODO: simply relationship with management component

   // TODO: potentially separate the listener with the broadcaster to avoid circular dependencies
   constructor(private deploymentExecutor: DeploymentExecutor,
               private customerService: CustomerService,
               private gameStorageService: GameStorageService,
               private config: ConfigurationService,
               private notificationService: NotificationService) {
      super();
   }

   public subscribe(tickService: TickService) {
      this.initalizeGettingStartedEvent(tickService);
      this.initializeNotificationSub();
      this.initializeDeploymentEventWatcher();
   }

   private initializeDeploymentEventWatcher() {
      this.deploymentSub = this.deploymentExecutor.pipeline
         .takeWhile(() => {
            let deploys = this.gameStorageService.game.company.businessUnits.development.deploymentInfo.deployCount;
            return deploys == 1;
         })
         .subscribe(() => this.grandOpening());
   }

   private initializeNotificationSub() {
      this.notificationSub = this.pipeline.subscribe(e => {
         if (e.isNotification)
            this.notificationService.composeAndSend(e.eventName, e.description, e.logType);
      })
   }

   private initalizeGettingStartedEvent(tickService: TickService) {
      this.tickerSubscription = tickService.pipeline
         .takeWhile(() => this.config.showWelcomeModal && this.gameStorageService.game.company.resources.code.pushed.totalAccumulated <= 0)
         .take(1)
         .subscribe(() => {
            this.fireSpecialEvent("Welcome to Codestomp!", "Grow a business. Hold no prisoners.", "Get Started", LogType.Info, SpecialEventDisplayType.Modal);
         });
   }

   public unsubscribe(): any {
      if (this.notificationSub) {
         this.notificationSub.unsubscribe();
      }
      if (this.deploymentSub) {
         this.deploymentSub.unsubscribe();
      }
      return super.unsubscribe();
   }

   public fireSpecialEvent(eventName: string, description: string, buttonText: string, logType: LogType, displayType: SpecialEventDisplayType) {
      let specialEvent = new SpecialEvent(
         eventName,
         description,
         buttonText,
         logType,
         displayType
      );
      this.source.next(specialEvent);
   }

   private grandOpening() {
      let count = 5;
      this.customerService.add(count);
      let message = `Your first deployment is a success. ${count} bonus customers have signed on following the product launch!`;
      this.fireSpecialEvent('Congratulations!', message, 'Resume', LogType.Success, SpecialEventDisplayType.Notification);
   }
}
