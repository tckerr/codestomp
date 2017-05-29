import {Injectable} from '@angular/core';
import {IdGeneratorService} from './id-generator.service';
import {environment} from '../../environments/environment';
import {BusinessUnits} from '../models/business-units/business-units.enum';
import * as moment from 'moment';
import {ExperienceLevel, StaffType} from '../models/definitions/staff-definitions';

@Injectable()
export class GameSeedGeneratorService {

   constructor(private idGeneratorService: IdGeneratorService) {
   }

   public defaultSeed(): any {
      return {
         id: 'csgm_' + this.idGeneratorService.generate(),
         tick: 0,
         time: moment(environment.gameSettings.startTime).format(),
         marketResources: {
            talent: {
               balance: 0,
               totalAccumulated: 0
            }
         },
         company: {
            name: environment.gameSettings.defaults.companyName,
            unlocks: {
               manualTesting: 0,
               deployments: 0,
               devHiring: 0,
               bugFixes: 0,
            },
            resources: {
               funds: {
                  balance: environment.gameSettings.defaults.startingFunds,
                  totalAccumulated: environment.gameSettings.defaults.startingFunds
               },
               code: {
                  pushed: {
                     balance: 0,
                     totalAccumulated: 0
                  },
                  tested: {
                     balance: 0,
                     totalAccumulated: 0
                  },
                  deploying: {
                     balance: 0,
                     totalAccumulated: 0
                  },
                  prod: {
                     balance: 0,
                     totalAccumulated: 0
                  },
                  bugs: {
                     balance: 0,
                     totalAccumulated: 0
                  }
               },
               customers: {
                  balance: 0,
                  totalAccumulated: 0
               }
            },
            businessUnits: [
               {
                  id: BusinessUnits.HR,
                  name: 'Human Resources',
                  active: false
               },
               {
                  id: BusinessUnits.Debug,
                  name: 'Debug',
                  active: true
               },
               {
                  id: BusinessUnits.Development,
                  name: 'Development',
                  active: true,
                  deploymentInfo: {
                     lastDeployUtc: moment.min().format(),
                     deployCount: 0,
                  },
                  staff: [
                     {
                        displayName: 'Associate Developer',
                        type: StaffType.Developer,
                        experience: ExperienceLevel.Associate,
                        baseSalaryPerMs: environment.gameSettings.businessUnits.development.staff.baseSalaryPerMs.associateDeveloper,
                        hired: 0,
                        typeDetails: {
                           codePerMs: environment.gameSettings.businessUnits.development.staff.codePerMs.associateDeveloper,
                           testingPerMs: environment.gameSettings.businessUnits.development.staff.testingPerMs.associateDeveloper,
                           bugFixesPerMs: environment.gameSettings.businessUnits.development.staff.bugFixesPerMs.associateDeveloper
                        }
                     },
                     {
                        displayName: 'Development Intern',
                        type: StaffType.Developer,
                        experience: ExperienceLevel.Intern,
                        special: environment.gameSettings.businessUnits.development.staff.special.developmentIntern,
                        baseSalaryPerMs: environment.gameSettings.businessUnits.development.staff.baseSalaryPerMs.developmentIntern,
                        hired: 0,
                        typeDetails: {
                           codePerMs: environment.gameSettings.businessUnits.development.staff.codePerMs.developmentIntern,
                           testingPerMs: environment.gameSettings.businessUnits.development.staff.testingPerMs.developmentIntern,
                           bugFixesPerMs: environment.gameSettings.businessUnits.development.staff.bugFixesPerMs.developmentIntern,
                        }
                     },
                     {
                        displayName: 'Junior Developer',
                        type: StaffType.Developer,
                        experience: ExperienceLevel.Junior,
                        baseSalaryPerMs: environment.gameSettings.businessUnits.development.staff.baseSalaryPerMs.juniorDeveloper,
                        hired: 0,
                        typeDetails: {
                           codePerMs: environment.gameSettings.businessUnits.development.staff.codePerMs.juniorDeveloper,
                           testingPerMs: environment.gameSettings.businessUnits.development.staff.testingPerMs.juniorDeveloper,
                           bugFixesPerMs: environment.gameSettings.businessUnits.development.staff.bugFixesPerMs.juniorDeveloper,
                        }
                     },
                     {
                        displayName: 'Senior Developer',
                        type: StaffType.Developer,
                        experience: ExperienceLevel.Senior,
                        baseSalaryPerMs: environment.gameSettings.businessUnits.development.staff.baseSalaryPerMs.seniorDeveloper,
                        hired: 0,
                        typeDetails: {
                           codePerMs: environment.gameSettings.businessUnits.development.staff.codePerMs.seniorDeveloper,
                           testingPerMs: environment.gameSettings.businessUnits.development.staff.testingPerMs.seniorDeveloper,
                           bugFixesPerMs: environment.gameSettings.businessUnits.development.staff.bugFixesPerMs.seniorDeveloper,
                        }
                     },
                     {
                        displayName: 'Associate QA Analyst',
                        type: StaffType.QA,
                        experience: ExperienceLevel.Associate,
                        baseSalaryPerMs: environment.gameSettings.businessUnits.development.staff.baseSalaryPerMs.associateQaAnalyst,
                        hired: 0,
                        typeDetails: {
                           codePerMs: environment.gameSettings.businessUnits.development.staff.codePerMs.associateQaAnalyst,
                           testingPerMs: environment.gameSettings.businessUnits.development.staff.testingPerMs.associateQaAnalyst,
                           bugFixesPerMs: environment.gameSettings.businessUnits.development.staff.bugFixesPerMs.associateQaAnalyst,
                        }
                     },
                     {
                        displayName: 'Junior QA Analyst',
                        type: StaffType.QA,
                        experience: ExperienceLevel.Junior,
                        baseSalaryPerMs: environment.gameSettings.businessUnits.development.staff.baseSalaryPerMs.juniorQaAnalyst,
                        hired: 0,
                        typeDetails: {
                           codePerMs: environment.gameSettings.businessUnits.development.staff.codePerMs.juniorQaAnalyst,
                           testingPerMs: environment.gameSettings.businessUnits.development.staff.testingPerMs.juniorQaAnalyst,
                           bugFixesPerMs: environment.gameSettings.businessUnits.development.staff.bugFixesPerMs.juniorQaAnalyst,

                        }
                     },
                     {
                        displayName: 'Senior QA Analyst',
                        type: StaffType.QA,
                        experience: ExperienceLevel.Senior,
                        baseSalaryPerMs: environment.gameSettings.businessUnits.development.staff.baseSalaryPerMs.seniorQaAnalyst,
                        hired: 0,
                        typeDetails: {
                           codePerMs: environment.gameSettings.businessUnits.development.staff.codePerMs.seniorQaAnalyst,
                           testingPerMs: environment.gameSettings.businessUnits.development.staff.testingPerMs.seniorQaAnalyst,
                           bugFixesPerMs: environment.gameSettings.businessUnits.development.staff.bugFixesPerMs.seniorQaAnalyst,

                        }
                     },
                     {
                        displayName: 'QA Automation Engineer',
                        type: StaffType.QA,
                        experience: ExperienceLevel.Senior,
                        baseSalaryPerMs: environment.gameSettings.businessUnits.development.staff.baseSalaryPerMs.qaAutomationEngineer,
                        hired: 0,
                        typeDetails: {
                           codePerMs: environment.gameSettings.businessUnits.development.staff.codePerMs.qaAutomationEngineer,
                           testingPerMs: environment.gameSettings.businessUnits.development.staff.testingPerMs.qaAutomationEngineer,
                           bugFixesPerMs: environment.gameSettings.businessUnits.development.staff.bugFixesPerMs.qaAutomationEngineer,
                        }
                     },
                     {
                        displayName: 'Dev Ops Engineer',
                        type: StaffType.DevOps,
                        special: environment.gameSettings.businessUnits.development.staff.special.devopsEngineer,
                        experience: ExperienceLevel.Senior,
                        baseSalaryPerMs: environment.gameSettings.businessUnits.development.staff.baseSalaryPerMs.devopsEngineer,
                        hired: 0,
                        typeDetails: {
                           codePerMs: environment.gameSettings.businessUnits.development.staff.codePerMs.devopsEngineer,
                           testingPerMs: environment.gameSettings.businessUnits.development.staff.testingPerMs.devopsEngineer,
                           bugFixesPerMs: environment.gameSettings.businessUnits.development.staff.bugFixesPerMs.devopsEngineer,
                        }
                     }
                  ]
               }
            ]
         }
      }
   }
}
