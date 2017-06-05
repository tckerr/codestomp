import {Injectable} from '@angular/core';
import {ExperienceLevel, StaffCategory, StaffType} from '../../../models/definitions/staff-definitions';
import {hour, year} from '../../../../environments/environment';
import * as moment from 'moment';
import {ConfigurationService} from '../../../configuration/configuration.service';

@Injectable()
export class DevelopmentSeedGeneratorService {

   constructor(private config: ConfigurationService) {
   }

   public build() {
      return {
         id: 'development',
         name: 'Development',
         icon: 'fa-rocket',
         active: this.config.DEVELOPMENT_UNLOCKED_AT_START,
         deploymentInfo: {
            lastDeployUtc: moment.min().format(),
            lastDeployInitiatedUtc: moment.min().format(),
            deployCount: 0,
            currentDeployRate: 0,
            deploying: false,
         },
         staff: [
            {
               id: StaffType.DevelopmentIntern,
               displayName: 'Development Intern',
               category: StaffCategory.Developer,
               experience: ExperienceLevel.Intern,
               special: 'Fixes bugs... basically for free',
               baseSalaryPerMs: 10000 / year,
               hired: 0,
               typeDetails: {
                  codePerMs: 1 / hour,
                  testingPerMs: 0,
                  bugFixesPerMs: 3 / hour
               }
            },
            {
               id: StaffType.AssociateDeveloper,
               displayName: 'Associate Developer',
               category: StaffCategory.Developer,
               experience: ExperienceLevel.Associate,
               baseSalaryPerMs: 50000 / year,
               hired: 0,
               typeDetails: {
                  codePerMs: 15 / hour,
                  testingPerMs: 0,
                  bugFixesPerMs: 0
               }
            },
            {
               id: StaffType.JuniorDeveloper,
               displayName: 'Junior Developer',
               category: StaffCategory.Developer,
               experience: ExperienceLevel.Junior,
               baseSalaryPerMs: 85000 / year,
               hired: 0,
               typeDetails: {
                  codePerMs: 45 / hour,
                  testingPerMs: 0,
                  bugFixesPerMs: 0,
               }
            },
            {
               id: StaffType.SeniorDeveloper,
               displayName: 'Senior Developer',
               category: StaffCategory.Developer,
               experience: ExperienceLevel.Senior,
               baseSalaryPerMs: 125000 / year,
               hired: 0,
               typeDetails: {
                  codePerMs: 90 / hour,
                  testingPerMs: 0,
                  bugFixesPerMs: 0,
               }
            },
            {
               id: StaffType.AssociateQaAnalyst,
               displayName: 'Associate QA Analyst',
               category: StaffCategory.QA,
               experience: ExperienceLevel.Associate,
               baseSalaryPerMs: 40000 / year,
               hired: 0,
               typeDetails: {
                  codePerMs: 0,
                  testingPerMs: 10 / hour,
                  bugFixesPerMs: 0,
               }
            },
            {
               id: StaffType.JuniorQaAnalyst,
               displayName: 'Junior QA Analyst',
               category: StaffCategory.QA,
               experience: ExperienceLevel.Junior,
               baseSalaryPerMs: 55000 / year,
               hired: 0,
               typeDetails: {
                  codePerMs: 0,
                  testingPerMs: 25 / hour,
                  bugFixesPerMs: 0,

               }
            },
            {
               id: StaffType.SeniorQaAnalyst,
               displayName: 'Senior QA Analyst',
               category: StaffCategory.QA,
               experience: ExperienceLevel.Senior,
               baseSalaryPerMs: 70000 / year,
               hired: 0,
               typeDetails: {
                  codePerMs: 0,
                  testingPerMs: 45 / hour,
                  bugFixesPerMs: 0,

               }
            },
            {
               id: StaffType.QaAutomationEngineer,
               displayName: 'QA Automation Engineer',
               category: StaffCategory.QA,
               experience: ExperienceLevel.Senior,
               baseSalaryPerMs: 100000 / year,
               hired: 0,
               typeDetails: {
                  codePerMs: 0,
                  testingPerMs: 70 / hour,
                  bugFixesPerMs: 0,
               }
            },
            {
               id: StaffType.DevOpsEngineer,
               displayName: 'Dev Ops Engineer',
               category: StaffCategory.DevOps,
               special: 'Automates deployments on a regular schedule',
               experience: ExperienceLevel.Senior,
               baseSalaryPerMs: 100000 / year,
               hired: 0,
               typeDetails: {
                  codePerMs: 0,
                  testingPerMs: 0,
                  bugFixesPerMs: 0,
               }
            }
         ]
      }
   }
}
