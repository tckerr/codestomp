import {Injectable} from '@angular/core';
import {LoggerService, LogType} from '../logger-service';
import {QuitterNotificationService} from '../quitter-notification.service';
import {ConfigurationService} from '../configuration.service';
import * as Enumerable from 'linq';
import {Staff} from '../../models/business-units/staff';
import {DevelopmentBusinessUnitAccessorService} from './development-business-unit-accessor.service';
import {TalentService} from "./talent.service";
import {ExperienceLevel} from "../../models/definitions/staff-definitions";

@Injectable()
export class DeveloperStaffService {

   constructor(private quitterNotificationService: QuitterNotificationService,
               private config: ConfigurationService,
               private devAccessor: DevelopmentBusinessUnitAccessorService,
               private talentService: TalentService,
               private logger: LoggerService) {
   }

   private getStaffByDisplayName(displayName: string){
      for (let staff of this.devAccessor.businessUnit.staff) {
         if (staff.displayName == displayName){
            return staff;
         }
      }
      throw Error("Staff type not found! " + displayName);
   }

   public hire(displayName: string, exp: ExperienceLevel){
      this.talentService.hire(exp);
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
      return Enumerable
         .from(this.devAccessor.businessUnit.staff)
         .orderBy(n => n.experience)
         .toArray();
   }

   // TODO: move to diff class
   // TODO: offset quit chance with time
   public chanceRandomQuit(ms: number){
      let businessUnit = this.devAccessor.businessUnit;
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
