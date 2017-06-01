import {Injectable} from '@angular/core';
import {LoggerService, LogType} from '../logger-service';
import {QuitterNotificationService} from '../quitter-notification.service';
import {ConfigurationService} from '../configuration.service';
import * as Enumerable from 'linq';
import {Staff} from '../../models/business-units/staff';
import {DevelopmentBusinessUnitAccessorService} from './development-business-unit-accessor.service';
import {TalentService} from './talent.service';
import {ExperienceLevel, StaffType} from '../../models/definitions/staff-definitions';

@Injectable()
export class DeveloperStaffService {

   constructor(private quitterNotificationService: QuitterNotificationService,
               private config: ConfigurationService,
               private devAccessor: DevelopmentBusinessUnitAccessorService,
               private talentService: TalentService,
               private logger: LoggerService) {
   }

   private getStaffById(id: StaffType) {
      for (const staff of this.devAccessor.businessUnit.staff) {
         if (staff.id === id) {
            return staff;
         }
      }
      throw Error('Staff type not found! ' + id);
   }

   public hire(id: StaffType, exp: ExperienceLevel) {
      this.talentService.hire(exp);
      let staff = this.getStaffById(id);
      staff.hired++;
      this.logger.gameLog(`New hire: ${staff.displayName}!`, LogType.Success);
   }

   public fire(id: StaffType) {
      let staff = this.getStaffById(id);
      if (staff.hired <= 0)
         throw Error('Cannot fire staff... none exist!');
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
   public chanceRandomQuit(ms: number) {
      let businessUnit = this.devAccessor.businessUnit;
      if (!businessUnit.$totalStaff)
         return;

      if (Math.random() > (ms * this.config.quitChanceOnLackOfPayment))
         return;

      let hasHired = Enumerable.from(businessUnit.staff).where(s => s.hired > 0).toArray();
      let choice = hasHired[Math.floor(Math.random() * hasHired.length)];
      this.quitType(choice);
   }

   private quitType(staff: Staff) {
      staff.hired--;
      this.quitterNotificationService.newQuitter(`One ${staff.displayName}`, 'lack of payment');
   }
}
