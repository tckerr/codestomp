import {Injectable} from '@angular/core';
import {LoggerService, LogType} from '../logger-service';
import {GameStorageService} from '../game-storage.service';
import {DevelopmentBusinessUnit} from '../../models/business-units/development-business-unit';
import {BusinessUnits} from '../../models/business-units/business-units.enum';
import {QuitterNotificationService} from '../quitter-notification.service';
import {ConfigurationService} from '../configuration.service';
import * as Enumerable from 'linq';
import {Staff} from '../../models/business-units/staff';

@Injectable()
export class DeveloperStaffService {

   constructor(private gameStorageService: GameStorageService,
               private quitterNotificationService: QuitterNotificationService,
               private config: ConfigurationService,
               private logger: LoggerService) {
   }

   //TODO: a class, also remove from DevelopmentComponent
   private get businessUnit(): DevelopmentBusinessUnit {
      let businessUnits = this.gameStorageService.game.company.businessUnits;
      for (let i = 0; i < businessUnits.length; ++i) {
         if (businessUnits[i].id == BusinessUnits.Development)
            return (<DevelopmentBusinessUnit>businessUnits[i]);
      }
      throw Error('Business unit not found!');
   }

   private getStaffByDisplayName(displayName: string){
      for (let staff of this.businessUnit.staff) {
         if (staff.displayName == displayName){
            return staff;
         }
      }
      throw Error("Staff type not found! " + displayName);
   }

   public hire(displayName: string){
      let staff = this.getStaffByDisplayName(displayName);
      staff.hired++;
      this.logger.gameLog(`New hire: ${staff.displayName}!`, LogType.Success);
   }

   public fire(displayName: string){
      let staff = this.getStaffByDisplayName(displayName);
      if(staff.hired <= 0)
         throw Error("Cannot fire staff... none exist!");
      staff.hired--;
      this.logger.gameLog(`Fired: ${staff.displayName}!`, LogType.Success);
   }

   public get staff() {
      return this.businessUnit.staff;
   }

   // TODO: move to diff class
   // TODO: offset quit chance with time
   public chanceRandomQuit(ms: number){
      let businessUnit = this.businessUnit;
      if(!businessUnit.$totalStaff)
         return;

      if(Math.random() > (ms * this.config.quitChanceOnLackOfPayment))
         return;

      let hasHired = Enumerable.from(businessUnit.staff).where(s => s.hired > 0).toArray();
      let choice = hasHired[Math.floor(Math.random() * hasHired.length)];
      this.quitType(choice);
   }

   private quitType(staff: Staff) {
      staff.hired--;
      this.quitterNotificationService.newQuitter(`One ${staff.displayName}`, "lack of payment");
   }
}
