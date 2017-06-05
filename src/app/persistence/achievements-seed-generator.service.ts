import {Injectable} from "@angular/core";
import {AchievementCriteriaType} from "../models/achievements/achievement-criteria-type.enum";
import {UnlockableFeature} from "../models/achievements/unlockable-feature.enum";
import {LogType} from "../models/definitions/log-type";

@Injectable()
export class AchievementsSeedGeneratorService {

   constructor() {
   }

   public build(): any {
      let seed = [
         {
            id: 'hr',
            unlocked: true,
            displayName: 'HR Achievements',
            blocks: []
         },
         {
            id: 'marketing',
            unlocked: true,
            displayName: 'Marketing Achievements',
            blocks: []
         },
         {
            id: 'finance',
            unlocked: true,
            displayName: 'Finance Achievements',
            blocks: []
         },
         {
            id: 'debug',
            unlocked: true,
            displayName: 'Debug Achievements',
            blocks: []
         },
         {
            id: 'incoporation',
            unlocked: false,
            displayName: 'Incorporation',
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
               {
                  displayName: 'Divide and Conquer',
                  unlocked: false,
                  cumulative: false,
                  criteriaType: AchievementCriteriaType.UnlockedBusinessUnits,
                  unlockWhenValueGte: 1,
                  unlocksFeature: UnlockableFeature.None,
                  notification: {
                     title: 'You\'ve expanded to another business unit!',
                     message: '...',
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
      ]
      return seed;
   };
}



