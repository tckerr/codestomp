import {Injectable} from '@angular/core';
import {IdGeneratorService} from '../util/id-generator.service';
import {environment} from '../../../environments/environment';
import * as moment from 'moment';
import {ExperienceLevel, StaffCategory, StaffType} from '../../models/definitions/staff-definitions';
import {AchievementCriteriaType} from '../../models/achievements/achievement-criteria-type.enum';
import {UnlockableFeature} from '../../models/achievements/unlockable-feature.enum';
import {LogType} from '../../models/definitions/log-type';
import {EnumParser} from '../../util/enum-parser';


@Injectable()
export class GameSeedGeneratorService {

   constructor(private idGeneratorService: IdGeneratorService) {
   }

   public defaultSeed(): any {
      let unlockedFeatures = {};
      EnumParser.getMembers(UnlockableFeature).forEach(a => unlockedFeatures[a] = false);

      return {
         id: 'csgm_' + this.idGeneratorService.generate(),
         tick: 0,
         time: moment(environment.gameSettings.startTime).format(),
         marketResources: {
            talent: {
               balance: 0,
               totalAccumulated: 0,
               canBeNegative: false
            }
         },
         unlockedFeatures: unlockedFeatures,
         achievementTracks: [
            {
               id: 'hr',
               unlocked: true,
               displayName: 'HR Achievements',
               blocks: []
            },
            {
               id: 'incoporation',
               unlocked: false,
               displayName: "Incorporation",
               blocks: [
                  {
                     displayName: 'Incorporation',
                     unlocked: false,
                     cumulative: true,
                     criteriaType: AchievementCriteriaType.ConcurrentCustomers,
                     unlockWhenValueGte: 1000,
                     unlocksFeature: UnlockableFeature.Incorporation,
                     notification: {
                        title: 'Your business is now a corporation!',
                        message: 'You\'re on the road to success.',
                        logType: LogType.Success
                     }
                  },
               ]
            },
            {
               id: 'development',
               unlocked: true,
               displayName: 'Development Achievements',
               blocks: [
                  {
                     displayName: 'Manual Testing',
                     unlocked: false,
                     baseline: 0,
                     criteriaType: AchievementCriteriaType.TotalPushedCodeAccumulated,
                     unlockWhenValueGte: 70,
                     unlocksFeature: UnlockableFeature.ManualTesting,
                     notification: {
                        title: 'Time to test',
                        message: 'Boring, we know. But testing is important!',
                        logType: LogType.Info
                     }
                  },
                  {
                     displayName: 'Manual Deployments',
                     unlocked: false,
                     criteriaType: AchievementCriteriaType.TotalTestedCodeAccumulated,
                     unlockWhenValueGte: 70,
                     unlocksFeature: UnlockableFeature.ManualDeployments,
                     notification: {
                        title: 'Just a little more...',
                        message: 'You\'ve almost got enough for your app. Get ready to ship code to production!',
                        logType: LogType.Info
                     }
                  },
                  {
                     displayName: 'Bug Fixes',
                     unlocked: false,
                     criteriaType: AchievementCriteriaType.TotalProdCodeAccumulated,
                     unlockWhenValueGte: 200,
                     unlocksFeature: UnlockableFeature.ManualBugFixes,
                     notification: {
                        title: 'Bugs! Oh my!',
                        message: 'Bugs are starting to pile up in production. Fix them!',
                        logType: LogType.Error
                     }
                  },
                  {
                     displayName: 'Development Staff',
                     unlocked: false,
                     triggersTrack: 'incoporation',
                     criteriaType: AchievementCriteriaType.TotalProdCodeAccumulated,
                     unlockWhenValueGte: 400,
                     unlocksFeature: UnlockableFeature.DevelopmentHiringTier1,
                     notification: {
                        title: 'Time to grow your business!',
                        message: 'Check out the development job market for details on how to hire your first employee.',
                        logType: LogType.Success
                     }
                  },
                  {
                     displayName: 'Dev Staff Tier 2',
                     unlocked: false,
                     criteriaType: AchievementCriteriaType.TotalFundsAccumulated,
                     unlockWhenValueGte: 3000,
                     unlocksFeature: UnlockableFeature.DevelopmentHiringTier2,
                     notification: {
                        title: 'Development hiring options unlocked!',
                        message: 'Check out the development job market for more options.',
                        logType: LogType.Success
                     }
                  },
                  {
                     displayName: 'Dev Staff Tier 3',
                     unlocked: false,
                     criteriaType: AchievementCriteriaType.TotalFundsAccumulated,
                     unlockWhenValueGte: 10000,
                     unlocksFeature: UnlockableFeature.DevelopmentHiringTier3,
                     notification: {
                        title: 'Development hiring options unlocked!',
                        message: 'Check out the development job market for more options.',
                        logType: LogType.Success
                     }
                  }
               ]
            }
         ],
         company: {
            name: environment.gameSettings.defaults.companyName,
            unlocks: {
               manualTesting: 0,
               deployments: 0,
               hiring: {
                  development: 0,
                  hr: 0,
                  debug: 0
               },
               bugFixes: 0,
            },
            resources: {
               funds: {
                  balance: environment.gameSettings.defaults.startingFunds,
                  totalAccumulated: environment.gameSettings.defaults.startingFunds,
                  canBeNegative: false
               },
               code: {
                  pushed: {
                     balance: 0,
                     totalAccumulated: 0,
                     canBeNegative: false
                  },
                  tested: {
                     balance: 0,
                     totalAccumulated: 0,
                     canBeNegative: false
                  },
                  deploying: {
                     balance: 0,
                     totalAccumulated: 0,
                     canBeNegative: false
                  },
                  prod: {
                     balance: 0,
                     totalAccumulated: 0,
                     canBeNegative: false
                  },
                  bugs: {
                     balance: 0,
                     totalAccumulated: 0,
                     canBeNegative: false
                  }
               },
               customers: {
                  balance: 0,
                  totalAccumulated: 0,
                     canBeNegative: false
               }
            },
            businessUnits: {
               hr: {
                  id: 'hr',
                  name: 'Human Resources',
                  icon: 'fa-users',
                  active: false,
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
               },
               debug: {
                  id: 'debug',
                  name: 'Debug',
                  icon: 'fa-code',
                  active: false,
                  staff: []
               },
               development: {
                  id: 'development',
                  name: 'Development',
                  icon: 'fa-rocket',
                  active: true,
                  deploymentInfo: {
                     lastDeployUtc: moment.min().format(),
                     lastDeployInitiatedUtc: moment.min().format(),
                     deployCount: 0,
                     currentDeployRate: 0,
                     deploying: false,
                  },
                  staff: [
                     {
                        id: StaffType.AssociateDeveloper,
                        displayName: 'Associate Developer',
                        category: StaffCategory.Developer,
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
                        id: StaffType.DevelopmentIntern,
                        displayName: 'Development Intern',
                        category: StaffCategory.Developer,
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
                        id: StaffType.JuniorDeveloper,
                        displayName: 'Junior Developer',
                        category: StaffCategory.Developer,
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
                        id: StaffType.SeniorDeveloper,
                        displayName: 'Senior Developer',
                        category: StaffCategory.Developer,
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
                        id: StaffType.AssociateQaAnalyst,
                        displayName: 'Associate QA Analyst',
                        category: StaffCategory.QA,
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
                        id: StaffType.JuniorQaAnalyst,
                        displayName: 'Junior QA Analyst',
                        category: StaffCategory.QA,
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
                        id: StaffType.SeniorQaAnalyst,
                        displayName: 'Senior QA Analyst',
                        category: StaffCategory.QA,
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
                        id: StaffType.QaAutomationEngineer,
                        displayName: 'QA Automation Engineer',
                        category: StaffCategory.QA,
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
                        id: StaffType.DevOpsEngineer,
                        displayName: 'Dev Ops Engineer',
                        category: StaffCategory.DevOps,
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
            }
         }
      };
   }

}

