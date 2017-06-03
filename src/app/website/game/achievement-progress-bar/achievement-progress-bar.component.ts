import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {AchievementsService} from '../../../services/achievements/achievements.service';
import {AchievementEvaluatorService} from '../../../services/achievements/achievement-evaluator.service';
import * as Enumerable from 'linq';
import {isNullOrUndefined} from 'util';
import {AchievementCriteriaValueResolverService} from '../../../services/achievements/achievement-criteria-value-resolver.service';
import {UnlockableFeature} from '../../../models/achievements/unlockable-feature.enum';

@Component({
   selector: 'app-achievement-progress-bar',
   templateUrl: './achievement-progress-bar.component.html',
   styleUrls: ['./achievement-progress-bar.component.css']
})
export class AchievementProgressBarComponent implements OnInit, OnChanges {


   @Input() achievementTrackId: string;

   constructor(private achievementsService: AchievementsService,
               private achievementEvaluatorService: AchievementEvaluatorService,
               private criteriaResolver: AchievementCriteriaValueResolverService,
   ) {
   }

   ngOnInit() {
   }

   ngOnChanges(changes: SimpleChanges): void {
      if (changes['achievementTrackId'])
         this.achievementTrackId = changes['achievementTrackId'].currentValue;
   }

   public get eligible() {
      let blocks = this.achievementsService.track(this.achievementTrackId).blocks;
      return Enumerable
            .from(blocks)
            .where(b => !b.unlocked)
            .count() > 0;
   }

   public get progressPercent() {
      let block = this.achievementsService.pendingForId(this.achievementTrackId);
      if (isNullOrUndefined(block)) {
         return 0;
      }
      let progress = this.achievementEvaluatorService.achievementProgressPercent(block);
      return Math.floor(progress * 100);
   }

   public get currentValue() {
      let block = this.achievementsService.pendingForId(this.achievementTrackId);
      if (isNullOrUndefined(block)) {
         return 0;
      }
      return Math.floor(this.achievementEvaluatorService.current(block));
   }

   public get max() {
      let block = this.achievementsService.pendingForId(this.achievementTrackId);
      if (isNullOrUndefined(block)) {
         return 100;
      }
      return Math.floor(block.unlockWhenValueGte);
   }

   public get blockName() {
      let block = this.achievementsService.pendingForId(this.achievementTrackId);
      if (isNullOrUndefined(block)) {
         return '';
      }
      return block.displayName;
   }

   public get unitString() {
      let block = this.achievementsService.pendingForId(this.achievementTrackId);
      if (isNullOrUndefined(block)) {
         return '';
      }
      return this.criteriaResolver.typeToUnitString(block.criteriaType);
   }

   public get iconClass() {
      let block = this.achievementsService.pendingForId(this.achievementTrackId);
      if (isNullOrUndefined(block)) {
         return '';
      }
      return this.typeToIconClass(block.unlocksFeature);
   }

   private typeToIconClass(unlocksFeature: UnlockableFeature) {
      switch (unlocksFeature) {
         case UnlockableFeature.ManualTesting:
            return 'fa-check-square-o';
         case UnlockableFeature.ManualBugFixes:
            return 'fa-bug';
         case UnlockableFeature.ManualDeployments:
            return 'fa-ship';
         case UnlockableFeature.DevelopmentHiringTier1:
         case UnlockableFeature.DevelopmentHiringTier2:
         case UnlockableFeature.DevelopmentHiringTier3:
         case UnlockableFeature.HrHiringTier1:
            return 'fa-users';
         case UnlockableFeature.Incorporation:
            return 'fa-building-o';
      }
      let type = UnlockableFeature[<any>unlocksFeature];
      throw Error(`You have not implemented an icon class for the UnlockableFeature '${type}'`);
   }
}
