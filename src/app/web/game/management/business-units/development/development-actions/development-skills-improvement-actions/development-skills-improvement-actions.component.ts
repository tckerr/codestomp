import {Component, OnInit} from '@angular/core';
import {UnlockableFeature} from '../../../../../../../models/achievements/unlockable-feature.enum';
import {SkillsService} from '../../../../../../../game/resource-services/skills.service';
import {FundService} from '../../../../../../../game/resource-services/fund.service';
import {UnlocksService} from '../../../../../../../services/unlocks.service';

@Component({
   selector: 'app-development-skills-improvement-actions',
   templateUrl: './development-skills-improvement-actions.component.html',
   styleUrls: ['./development-skills-improvement-actions.component.css']
})
export class DevelopmentSkillsImprovementActionsComponent implements OnInit {

   constructor(private unlocksService: UnlocksService,
               private skillsService: SkillsService,
               private fundService: FundService,) {
   }

   ngOnInit() {   }

   private get selfImprovementUnlocked() {
      return this.unlocksService.isUnlocked(UnlockableFeature.SelfImprovement);
   }

   private get bugsUnlocked(){
      return this.unlocksService.isUnlocked(UnlockableFeature.ManualBugFixes);
   }

   private improve(skillStr: string, val: number = 1) {
      let skill = this.skillsService.skills[skillStr];
      this.skillsService.improveSkill(skill);
   }

   private selfImprovementCost(skillStr: string) {
      let skill = this.skillsService.skills[skillStr];
      return this.skillsService.getCost(skill);
   }

   private improvementAmount(skillStr: string) {
      let skill = this.skillsService.skills[skillStr];
      return this.skillsService.getImprovement(skill);
   }

   private canImprove(skillStr: string,) {
      let skill = this.skillsService.skills[skillStr];
      let cost = this.skillsService.getCost(skill);
      return this.fundService.funds.balance >= cost;
   }


}
