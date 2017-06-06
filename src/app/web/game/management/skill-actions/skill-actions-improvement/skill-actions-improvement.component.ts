import {Component, Input, OnInit} from '@angular/core';
import {ISkillAction} from '../../../../../game/business-units/skill-actions/i-skill-action';
import {UnlocksService} from '../../../../../game/achievements/unlocks.service';
import {UnlockableFeature} from '../../../../../models/achievements/unlockable-feature.enum';

@Component({
   selector: 'app-skill-actions-improvement',
   templateUrl: './skill-actions-improvement.component.html',
   styleUrls: ['./skill-actions-improvement.component.css']
})
export class SkillActionsImprovementComponent implements OnInit {

   @Input() actions: ISkillAction[];

   constructor(private unlocksService: UnlocksService) {
   }

   ngOnInit() {
   }

   public byIndex(index) {
      return index;
   }

   private get selfImprovementUnlocked() {
      return this.unlocksService.isUnlocked(UnlockableFeature.SelfImprovement);
   }
}
