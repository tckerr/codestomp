import {Injectable} from '@angular/core';
import {IdGeneratorService} from '../utilities/id-generator.service';
import {environment, hour, year} from '../../environments/environment';
import * as moment from 'moment';
import {ExperienceLevel, StaffCategory, StaffType} from '../models/definitions/staff-definitions';
import {AchievementCriteriaType} from '../models/achievements/achievement-criteria-type.enum';
import {UnlockableFeature} from '../models/achievements/unlockable-feature.enum';
import {LogType} from '../models/definitions/log-type';
import {EnumParserService} from '../utilities/enum-parser.service';
import {ConfigurationService} from '../configuration/configuration.service';


@Injectable()
export class GameSeedGeneratorService {

   constructor(
      private idGeneratorService: IdGeneratorService,
      private config: ConfigurationService,
      private enumParser: EnumParserService) {
   }

   public defaultSeed(): any {
      let unlockedFeatures = {};
      this.enumParser.getMembers(UnlockableFeature).forEach(a => unlockedFeatures[a] = false);

      return {
         id: this.idGeneratorService.generate(),
         tick: 0,
         time: moment(this.config.INITIAL_GAME_DATE).format(),
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
                     unlockWhenValueGte: 1500,
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
                        message: 'Boring, of course. But testing is important!',
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
                     displayName: 'Self Improvement',
                     unlocked: false,
                     criteriaType: AchievementCriteriaType.TotalProdCodeAccumulated,
                     unlockWhenValueGte: 140,
                     unlocksFeature: UnlockableFeature.SelfImprovement,
                     notification: {
                        title: 'Stay informed',
                        message: 'If you don\'t stay on top of the latest tech, you\'ll fall behind.',
                        logType: LogType.Info
                     }
                  },
                  {
                     displayName: 'Bug Fixes',
                     unlocked: false,
                     criteriaType: AchievementCriteriaType.TotalProdCodeAccumulated, // TODO: total bugs fixed
                     unlockWhenValueGte: 100,
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
                     unlockWhenValueGte: 300,
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
                     unlockWhenValueGte: 5000,
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
                     unlockWhenValueGte: 15000,
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
            name: "T-Corp",
            resources: {
               funds: {
                  balance: 0,
                  totalAccumulated: 0,
                  canBeNegative: false
               },
               skills: {
                  coding: {
                     balance: 300,
                     totalAccumulated: 3,
                     level: 1,
                     improvementConstant: 2,
                  },
                  testing: {
                     balance: 500,
                     totalAccumulated: 5,
                     level: 1,
                     improvementConstant: 3,
                  },
                  deploying: {
                     balance: 100,
                     totalAccumulated: 100,
                     level: 1,
                     improvementConstant: 20,
                  },
                  bugFixing: {
                     balance: 1,
                     totalAccumulated: 1,
                     level: 1,
                     improvementConstant: 1,
                  }
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
               corporate: {
                  id: 'corporate',
                  name: 'Corporate',
                  icon: 'fa-users',
                  active: false,
                  staff: []
               },
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
                  active: true,
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
      };
   }

}

