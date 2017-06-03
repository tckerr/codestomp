import {Injectable} from '@angular/core';
import {AchievementCriteriaType} from '../../models/achievements/achievement-criteria-type.enum';
import {CodeService} from '../resource-services/code.service';

@Injectable()
export class AchievementCriteriaValueResolverService {

   constructor(
      private codeService: CodeService,
   ) {
   }

   public typeToValue(criteriaType: AchievementCriteriaType): number {
      switch (criteriaType) {
         case AchievementCriteriaType.TotalPushedCodeAccumulated:
            return this.codeService.code.pushed.totalAccumulated;
         case AchievementCriteriaType.TotalTestedCodeAccumulated:
            return this.codeService.code.tested.totalAccumulated;
         case AchievementCriteriaType.TotalBugsCodeAccumulated:
            return this.codeService.code.bugs.totalAccumulated;
         case AchievementCriteriaType.TotalProdCodeAccumulated:
            return this.codeService.code.prod.totalAccumulated;
      }
   }

}
