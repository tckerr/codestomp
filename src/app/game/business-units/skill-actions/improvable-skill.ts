import {SkillsService} from '../../resource-services/skills.service';
import {FundService} from '../../resource-services/fund.service';

export abstract class ImprovableSkill {

   constructor(protected skillsService: SkillsService,
               protected fundService: FundService,) {

   }

   public abstract get skillId(): string;

   public improve() {
      let skill = this.skillsService.skills[this.skillId];
      this.skillsService.improveSkill(skill);
   }

   public get improveCost() {
      let skill = this.skillsService.skills[this.skillId];
      return this.skillsService.getCost(skill);
   }

   public get improveAmount() {
      let skill = this.skillsService.skills[this.skillId];
      return this.skillsService.getImprovement(skill);
   }

   public get canImprove() {
      let skill = this.skillsService.skills[this.skillId];
      let cost = this.skillsService.getCost(skill);
      return this.fundService.funds.balance >= cost;
   }
}
