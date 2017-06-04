import {Injectable} from '@angular/core';
import {AchievementBlock} from '../../models/achievements/achievement-block';
import {UnlockableFeature} from '../../models/achievements/unlockable-feature.enum';
import {UnlocksService} from './unlocks.service';
import {NotificationService} from '../notifications/notification.service';
import {AchievementsService} from './achievements.service';
import {AchievementCriteriaValueResolverService} from './achievement-criteria-value-resolver.service';
import * as Enumerable from 'linq';
import {AchievementTrackUnlockerService} from './achievement-track-unlocker.service';

@Injectable()
export class AchievementUnlockerService {

   constructor(private notificationService: NotificationService,
               private unlocksService: UnlocksService,
               private achievementsTrackUnlockerService: AchievementTrackUnlockerService) {
   }

   public unlock(block: AchievementBlock) {
      block.unlocked = true;
      let newlyUnlocked = this.resolveUnlock(block.unlocksFeature);
      if (!newlyUnlocked)
         throw Error('Achievement already unlocked!');

      if (block.triggersTrack)
         this.openTrack(block.triggersTrack);

      this.notificationService.send(block.notification);
      this.achievementsTrackUnlockerService.setBaselineForPending(block.$track.id);
   }

   private resolveUnlock(feature: UnlockableFeature) {
      let alreadyUnlocked = this.unlocksService.isUnlocked(feature);
      this.unlocksService.unlock(feature);
      return !alreadyUnlocked;
   }

   public openTrack(trackId: string) {
      this.achievementsTrackUnlockerService.openTrack(trackId);
   }
}
