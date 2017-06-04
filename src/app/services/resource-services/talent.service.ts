import {Injectable} from '@angular/core';
import {GameStorageService} from '../persistence/game-storage.service';
import {ExperienceLevel} from "../../models/definitions/staff-definitions";
import {environment} from "../../../environments/environment";
import {ConfigurationService} from "../config/configuration.service";

@Injectable()
export class TalentService {

   constructor(
      private gameStorageService: GameStorageService,
      private config: ConfigurationService,
   ){}

   public get talent() {
      return this.gameStorageService.game.marketResources.talent;
   }

   public add(count: number = 1): void {
      this.talent.add(count);
   }

   public remove(count: number = 1): void {
      if(count > this.talent.balance)
         throw Error("Not enough talent to remove!")
      this.talent.remove(count);
   }


   public hire(experience: ExperienceLevel, count: number = 1) {
      let individualCost = this.getCostForExperience(experience);
      let available = Math.floor(this.talent.balance / individualCost);
      if (available >= count)
         this.remove(individualCost * count);
      else
         throw Error('Cannot hire, not enough available!');
   }


   public get talentCap(){
      return this.config.TALENT_CAP;
   }

   public maxHires(experience: ExperienceLevel) {
      let cost = this.getCostForExperience(experience);
      return Math.floor(this.talent.balance / cost);
   }

   public getCostForExperience(experience: ExperienceLevel) {
      return this.config.TALENT_COST_PER_EXPERIENCE[experience];
   }

}
