import { Injectable } from '@angular/core';
import {ExperienceLevel, StaffType} from '../../models/definitions/staff-definitions';
import {LoggerService} from '../logging/logger-service';
import {TalentService} from '../resource-services/talent.service';
import {GameStorageService} from '../persistence/game-storage.service';
import * as Enumerable from 'linq';
import {LogType} from '../../models/definitions/log-type';

@Injectable()
export class HiringService {

  constructor(private gameStorageService: GameStorageService,
              private talentService: TalentService,
               private logger: LoggerService) { }

   public hire(id: StaffType, exp: ExperienceLevel, count: number = 1) {
      this.talentService.hire(exp, count);
      let staff = this.getStaffById(id);
      staff.hired += count;
      this.logger.gameLog(`Hired ${staff.displayName} x${count}!`, LogType.Success);
   }

   public fire(id: StaffType) {
      let staff = this.getStaffById(id);
      if (staff.hired <= 0)
         throw Error('Cannot fire staff... none exist!');
      staff.hired--;
      this.logger.gameLog(`Fired: ${staff.displayName}!`, LogType.Success);
   }

   private getStaffById(id: StaffType) {
      return Enumerable
         .from(this.gameStorageService.game.company.businessUnits.$asList())
         .selectMany(bu => bu.staff)
         .where(staff => staff.id === id)
         .first();
   }
}
