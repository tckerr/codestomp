import {Injectable} from '@angular/core';
import {AchievementBlock} from '../../models/achievements/achievement-block';
import {AchievementCriteriaValueResolverService} from './achievement-criteria-value-resolver.service';

@Injectable()
export class AchievementEvaluatorService {

   constructor(private valueResolver: AchievementCriteriaValueResolverService,) {
   }

   public achievementComplete(block: AchievementBlock) {
      return this.achievementProgressPercent(block) >= 1;
   }

   public achievementProgressPercent(block: AchievementBlock) {
      return this.current(block) / this.max(block);
   }

   public current(block: AchievementBlock) {
      if (!block.cumulative)
         return Math.max(0, this.valueResolver.typeToValue(block.criteriaType) - block.baseline);
      return this.valueResolver.typeToValue(block.criteriaType);
   }

   public max(block: AchievementBlock) {
      return block.unlockWhenValueGte;
   }
}
