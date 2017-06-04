import {Injectable} from '@angular/core';
import {GameStorageService} from '../persistence/game-storage.service';
import {ExperienceLevel} from '../models/definitions/staff-definitions';
import {UnlockableFeature} from '../models/achievements/unlockable-feature.enum';
import {Subject} from 'rxjs/Subject';

@Injectable()
export class UnlocksService {

   private source = new Subject<UnlockableFeature>();
   public pipeline = this.source.asObservable();

   constructor(private gameStorageService: GameStorageService) {
   }

   unlock(feature: UnlockableFeature) {
      if (feature == UnlockableFeature.None)
         return;
      this.gameStorageService.game.unlockedFeatures[feature] = true;
      this.source.next(feature);
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
