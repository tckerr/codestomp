import {Injectable} from '@angular/core';
import {TickService} from '../../../tick.service';
import {ConfigurationService} from '../../../../config/configuration.service';
import {TalentService} from "../../../../resource-services/talent.service";
import {ITickSubscriber} from '../i-tick-subscriber';

@Injectable()
export class TalentGeneratorService implements ITickSubscriber {

   constructor(private talentService: TalentService,
               private config: ConfigurationService) {
   }

   public subscribe(tickService: TickService) {
      tickService.pipeline.subscribe(
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
