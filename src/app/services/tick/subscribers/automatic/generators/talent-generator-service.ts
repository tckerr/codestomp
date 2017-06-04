import {Injectable} from '@angular/core';
import {TickService} from '../../../../../time/tick.service';
import {ConfigurationService} from '../../../../../configuration/configuration.service';
import {TalentService} from '../../../../resource-services/talent.service';
import {ITickSubscriber} from '../i-tick-subscriber';
import {TickSubscriberBase} from '../tick-subscriber-base';

@Injectable()
export class TalentGeneratorService extends TickSubscriberBase implements ITickSubscriber {

   constructor(private talentService: TalentService,
               private config: ConfigurationService) {
      super();
   }

   public subscribe(tickService: TickService) {
      this.tickerSubscription = tickService.pipeline.subscribe(
         tick => {
            let newCount = tick.msElapsed * this.config.TALENT_GENERATION_RATE;
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
