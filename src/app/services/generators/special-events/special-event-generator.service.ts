import {Injectable} from "@angular/core";
import {DeploymentExecutor} from "../../devops/deployment-executor.service";
import {CustomerService} from "../../resource-services/customer.service";
import {IGenerator} from "../igenerator";
import {LogType} from "../../logger-service";
import {Subject} from "rxjs/Subject";
import {SpecialEvent, SpecialEventDisplayType} from "../../../models/special-event";
import {NotificationService} from "./notification.service";
import {GameStorageService} from '../../game-storage.service';

@Injectable()
export class SpecialEventGeneratorService implements IGenerator {

   private source = new Subject<SpecialEvent>();
   public pipeline = this.source.asObservable(); // TODO: simply relationship with management component

   // TODO: potentially separate the listener with the broadcaster to avoid circular dependencies
   constructor(private deploymentExecutor: DeploymentExecutor,
               private customerService: CustomerService,
               private gameStorageService: GameStorageService,
               private notificationService: NotificationService) {
      this.pipeline.subscribe(e => {
         if (e.isNotification)
            this.notificationService.notify(e.eventName, e.description, e.logType);
      })
   }

   public generate() {
      this.deploymentExecutor.pipeline
         .takeWhile(() => {
            let deploys = this.gameStorageService.game.company.businessUnits.development.deploymentInfo.deployCount;
            return deploys === 1;
         })
         .subscribe(() => this.grandOpening());
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
