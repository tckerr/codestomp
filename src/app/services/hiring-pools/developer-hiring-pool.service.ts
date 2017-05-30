import {Injectable} from '@angular/core';
import {TalentGeneratorService} from '../generators/talent-generator-service';
import {LoggerService} from '../logger-service';
import {DeveloperStaffService} from '../resource-services/developer-staff.service';
import {ExperienceLevel} from '../../models/definitions/staff-definitions';

@Injectable()
export class DeveloperHiringPoolService {

   constructor(private talentGeneratorService: TalentGeneratorService,
               private developerStaffService: DeveloperStaffService,
   ) {
   }

   // TODO: can these methods be moved up or removed?

   public get totalTalent(){
      return this.talentGeneratorService.totalTalent;
   }

   public get talentCap(){
      return this.talentGeneratorService.talentCap;
   }

   public getCostForExperience(experienceLevel: ExperienceLevel){
      return this.talentGeneratorService.getCostForExperience(experienceLevel);
   }

   public maxHires(experienceLevel: ExperienceLevel){
      return this.talentGeneratorService.maxHires(experienceLevel);
   }

   public hire(staffName: string, experienceLevel: ExperienceLevel) {
      this.talentGeneratorService.hire(experienceLevel);
      this.developerStaffService.hire(staffName);
   }

}
