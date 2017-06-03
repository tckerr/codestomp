import {Injectable} from '@angular/core';
import {GameStorageService} from './persistence/game-storage.service';
import {ExperienceLevel} from '../models/definitions/staff-definitions';
import {UnlockableFeature} from '../models/achievements/unlockable-feature.enum';

@Injectable()
export class UnlocksService {

   constructor(private gameStorageService: GameStorageService) {
   }

   public get unlocks() {
      return this.gameStorageService.game.company.unlocks;
   }

   unlock(feature: UnlockableFeature) {
      if (feature == UnlockableFeature.None)
         return
      this.gameStorageService.game.unlockedFeatures[feature] = true;
   }

   public isUnlocked(feature: UnlockableFeature) {
      return this.gameStorageService.game.unlockedFeatures[feature] === true;
   }

   public staffAtExperienceIsUnlocked(exp: ExperienceLevel, businessTypeId: string) {
      // TODO: extract class
      if (businessTypeId === 'development') {
         switch (exp) {
            case ExperienceLevel.None:
               return true;
            case ExperienceLevel.Intern:
            case ExperienceLevel.Associate:
               return this.isUnlocked(UnlockableFeature.DevelopmentHiringTier1);
            case ExperienceLevel.Junior:
               return this.isUnlocked(UnlockableFeature.DevelopmentHiringTier2);
            case ExperienceLevel.Senior:
               return this.isUnlocked(UnlockableFeature.DevelopmentHiringTier3);
         }
      }
      return false;
   }
}
