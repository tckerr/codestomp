import {Injectable} from '@angular/core';
import {GameStorageService} from '../../persistence/game-storage.service';
import {SkillResource} from '../../models/game/resources/skills/skill-resource';
import {FundService} from './fund.service';


let fib = function (n) {
   let a = 0, b = 1, f = 1;
   for (let i = 2; i <= n; i++) {
      f = a + b;
      a = b;
      b = f;
   }
   return f;
};

@Injectable()
export class SkillsService {

   constructor(private gameStorageService: GameStorageService,
               private fundService: FundService,) {
   }

   public get skills() {
      return this.gameStorageService.game.company.resources.skills;
   }

   public improveSkill(skill: SkillResource) {
      let cost = this.getCost(skill);
      if (this.fundService.funds.balance <= cost)
         throw Error('You do not have enough funds to train this skill!');
      let improvement = this.getImprovement(skill);
      this.fundService.funds.remove(cost);
      skill.add(improvement);
      skill.level++;
   }

   public getCost(skill: SkillResource) {
      return fib(skill.level + 1);
   }

   public getImprovement(skill: SkillResource) {
      return skill.level * skill.improvementConstant;
   }

}
