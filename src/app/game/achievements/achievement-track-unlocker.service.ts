import {Injectable} from '@angular/core';
import {AchievementsService} from './achievements.service';
import {AchievementCriteriaValueResolverService} from './achievement-criteria-value-resolver.service';

@Injectable()
export class AchievementTrackUnlockerService {

   constructor(private achievementsService: AchievementsService,
               private criteriaValueResolver: AchievementCriteriaValueResolverService,) {
   }

   public openTrack(trackId: string) {
      this.achievementsService.track(trackId).unlocked = true;
      this.setBaselineForPending(trackId);
   }

   public setBaselineForPending(trackId: string) {
      let next = this.achievementsService.pendingForId(trackId);
      if (next)
         next.baseline = this.criteriaValueResolver.typeToValue(next.criteriaType);
   }
}
