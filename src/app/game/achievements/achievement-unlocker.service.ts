import {Injectable} from '@angular/core';
import {AchievementBlock} from '../../models/achievements/achievement-block';
import {UnlockableFeature} from '../../models/achievements/unlockable-feature.enum';
import {UnlocksService} from '../../services/unlocks.service';
import {NotificationService} from '../notifications/notification.service';
import {AchievementsService} from './achievements.service';
import {AchievementCriteriaValueResolverService} from './achievement-criteria-value-resolver.service';

@Injectable()
export class AchievementUnlockerService {

   constructor(private notificationService: NotificationService,
               private unlocksService: UnlocksService,
               private achievementsService: AchievementsService,
               private criteriaValueResolver: AchievementCriteriaValueResolverService,) {
   }

   public unlock(block: AchievementBlock) {
      block.unlocked = true;
      let newlyUnlocked = this.resolveUnlock(block.unlocksFeature);
      if (!newlyUnlocked)
         throw Error('Achievement already unlocked!');

      if (block.triggersTrack)
         this.openTrack(block.triggersTrack);

      this.notificationService.send(block.notification);
      let next = this.achievementsService.pendingForId(block.$track.id);
      if (next)
         next.baseline = this.criteriaValueResolver.typeToValue(next.criteriaType);
   }

   private resolveUnlock(feature: UnlockableFeature) {
      let alreadyUnlocked = this.unlocksService.isUnlocked(feature);
      this.unlocksService.unlock(feature);
      return !alreadyUnlocked;
   }

   private openTrack(trackId: string) {
      this.achievementsService.track(trackId).unlocked = true;
   }
}
