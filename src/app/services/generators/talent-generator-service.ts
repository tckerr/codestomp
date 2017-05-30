import {Injectable} from '@angular/core';
import {TickService} from '../tick/tick.service';
import {ConfigurationService} from '../configuration.service';
import {GameStorageService} from '../game-storage.service';
import {ExperienceLevel} from '../../models/definitions/staff-definitions';
import {environment} from '../../../environments/environment';

@Injectable()
export class TalentGeneratorService {

   constructor(private tickService: TickService,
               private config: ConfigurationService,
               private gameStorageService: GameStorageService) {
   }

   public generate() {
      this.tickService.pipeline.subscribe(
         tick => {
            let newCount = tick.msElapsed * this.config.talentGenerationPerMs;
            let existingTalent = this.totalTalent;
            let newTotal = newCount + existingTalent;
            let effectiveTotal = Math.min(newTotal, this.config.talentGenerationCap);
            let effectiveCount = effectiveTotal - existingTalent;
            if (effectiveCount > 0)
               this.gameStorageService.game.marketResources.talent.add(effectiveCount);
         }
      )
   }

   public get talentCap(){
      return this.config.talentGenerationCap;
   }

   public get totalTalent() {
      return this.gameStorageService.game.marketResources.talent.balance;
   }

   public maxHires(experience: ExperienceLevel) {
      let cost = this.getCostForExperience(experience);
      return Math.floor(this.totalTalent / cost);
   }

   public hire(experience: ExperienceLevel) {
      let cost = this.getCostForExperience(experience);
      let available = Math.floor(this.totalTalent / cost);
      if (available > 0)
         this.gameStorageService.game.marketResources.talent.balance -= cost;
      else
         throw Error('Cannot hire, no one available!');
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
