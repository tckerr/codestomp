import {Injectable} from '@angular/core';
import {AchievementBlock} from '../../models/achievements/achievement-block';
import {AchievementCriteriaValueResolverService} from './achievement-criteria-value-resolver.service';

@Injectable()
export class AchievementEvaluatorService {

   constructor(
      private valueResolver: AchievementCriteriaValueResolverService,
   ) {
   }

   public achievementComplete(block: AchievementBlock) {
      return this.achievementProgressPercent(block) >= 1;
   }

   public achievementProgressPercent(block: AchievementBlock) {
      let value = this.valueResolver.typeToValue(block.criteriaType);
      return value / block.unlockWhenValueGte;
   }

   public current(block: AchievementBlock) {
      return this.valueResolver.typeToValue(block.criteriaType);
   }
}
