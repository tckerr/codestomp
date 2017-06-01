import {Injectable} from '@angular/core';
import {TickService} from '../tick/tick.service';
import {ConfigurationService} from '../configuration.service';
import {GameStorageService} from '../game-storage.service';
import {ExperienceLevel} from '../../models/definitions/staff-definitions';
import {environment} from '../../../environments/environment';
import {TalentService} from "../resource-services/talent.service";

@Injectable()
export class TalentGeneratorService {

   constructor(private tickService: TickService,
               private talentService: TalentService,
               private config: ConfigurationService) {
   }

   public generate() {
      this.tickService.pipeline.subscribe(
         tick => {
            let newCount = tick.msElapsed * this.config.talentGenerationPerMs;
            let existingTalent = this.talentService.talent.balance;
            let newTotal = newCount + existingTalent;
            let effectiveTotal = Math.min(newTotal, this.talentService.talentCap);
            let effectiveCount = effectiveTotal - existingTalent;
            if (effectiveCount > 0)
               this.talentService.add(effectiveCount);
         }
      )
   }



}
