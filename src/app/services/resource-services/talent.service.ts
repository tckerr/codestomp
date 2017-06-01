import {Injectable} from '@angular/core';
import {GameStorageService} from '../game-storage.service';
import {ExperienceLevel} from "../../models/definitions/staff-definitions";
import {environment} from "../../../environments/environment";
import {ConfigurationService} from "../configuration.service";

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


   public hire(experience: ExperienceLevel) {
      let cost = this.getCostForExperience(experience);
      let available = Math.floor(this.talent.balance / cost);
      if (available > 0)
         this.remove(cost);
      else
         throw Error('Cannot hire, no one available!');
   }


   public get talentCap(){
      return this.config.talentGenerationCap;
   }

   public maxHires(experience: ExperienceLevel) {
      let cost = this.getCostForExperience(experience);
      return Math.floor(this.talent.balance / cost);
   }

   public getCostForExperience(experience: ExperienceLevel) {
      switch (experience) {
         case ExperienceLevel.Intern:
            return environment.gameSettings.talentHiringCosts.intern;
         case ExperienceLevel.Associate:
            return environment.gameSettings.talentHiringCosts.associate;
         case ExperienceLevel.Junior:
            return environment.gameSettings.talentHiringCosts.junior;
         case ExperienceLevel.Senior:
            return environment.gameSettings.talentHiringCosts.senior;
      }
   }

}
