import {Injectable} from '@angular/core';
import {ExperienceLevel, StaffCategory, StaffType} from '../../../models/definitions/staff-definitions';
import {ConfigurationService} from '../../../configuration/configuration.service';

@Injectable()
export class HrSeedGeneratorService {

   constructor(private config: ConfigurationService) {
   }

   public build() {
      return {
         id: 'hr',
         name: 'Human Resources',
         icon: 'fa-users',
         active: this.config.HR_UNLOCKED_AT_START,
         staff: [
            {
               id: StaffType.TalentScout,
               displayName: 'Talent Scout', // generates talent
               category: StaffCategory.TalentScout,
               experience: ExperienceLevel.Associate,
               baseSalaryPerMs: 0,
               hired: 0,
               typeDetails: {}
            },
            {
               id: StaffType.Recruiter,
               displayName: 'Recruiter', // auto-hire tier 1
               category: StaffCategory.Recruiter,
               experience: ExperienceLevel.Associate,
               baseSalaryPerMs: 0,
               hired: 0,
               typeDetails: {}
            },
            {
               id: StaffType.TalentAcquisitionManager,
               displayName: 'Talent Acquisition Manager', // auto-hire tier 2
               category: StaffCategory.Recruiter,
               experience: ExperienceLevel.Junior,
               baseSalaryPerMs: 0,
               hired: 0,
               typeDetails: {}
            },
            {
               id: StaffType.CorporateTrainer,
               displayName: 'Corporate Trainer', // hires inside the company (optional upgrades)
               category: StaffCategory.Trainer,
               experience: ExperienceLevel.Associate,
               baseSalaryPerMs: 0,
               hired: 0,
               typeDetails: {}
            },
            {
               id: StaffType.BenefitsSpecialist,
               displayName: 'Benefits Specialist', // internal satisfaction
               category: StaffCategory.EmployeeRetainer,
               experience: ExperienceLevel.Associate,
               baseSalaryPerMs: 0,
               hired: 0,
               typeDetails: {}
            }
         ]
      }
   }
}
