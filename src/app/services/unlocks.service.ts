import {Injectable} from '@angular/core';
import {GameStorageService} from './persistence/game-storage.service';
import {TickService} from './tick/tick.service';
import {ConfigurationService} from './config/configuration.service';
import {CodeService} from './resource-services/code.service';
import {FundService} from './resource-services/fund.service';
import {ExperienceLevel} from '../models/definitions/staff-definitions';
import {NotificationService} from './notifications/notification.service';
import {LogType} from '../models/definitions/log-type';
import {UnlockableFeature} from '../models/achievements/unlockable-feature.enum';

@Injectable()
export class UnlocksService {

   constructor(private gameStorageService: GameStorageService,
               private config: ConfigurationService,
               private codeService: CodeService,
               private fundService: FundService,
               private notificationService: NotificationService,
               private tickService: TickService) {
      this.tickService.pipeline.subscribe(() => this.checkUnlocks())
   }

   public get unlocks() {
      return this.gameStorageService.game.company.unlocks;
   }

   unlock(feature: UnlockableFeature) {
      if (feature == UnlockableFeature.None)
         return
      this.gameStorageService.game.unlockedFeatures[feature] = true;
   }

   public isUnlocked(feature: UnlockableFeature){
      return this.gameStorageService.game.unlockedFeatures[feature] === true;
   }

   private checkUnlocks() {
      if (this.unlocks.bugFixes > 0 && this.unlocks.hiring.development <= 3) {
         if (this.config.unlockDevHiringWhenFundsGte[this.unlocks.hiring.development] <= this.fundService.funds.totalAccumulated) {
            this.gameStorageService.game.company.unlocks.hiring.development++;
            let message = `Development Hiring tier ${this.unlocks.hiring.development} unlocked`;
            this.notificationService.composeAndSend(
               message, 'You\'ve got a whole new set of options, although they\'re surely expensive....', LogType.Success);
         }
      }
   }

   public staffAtExperienceIsUnlocked(exp: ExperienceLevel, businessTypeId: string) {
      return this.unlocks.hiring[businessTypeId] >= this.experienceTypeToUnlockTier(exp);
   }

   public experienceTypeToUnlockTier(exp: ExperienceLevel) {
      switch (exp) {
         case ExperienceLevel.Junior:
            return 2;
         case ExperienceLevel.Senior:
            return 3;
         default:
            return 1;
      }
   }
}
