import {Injectable} from '@angular/core';
import {TickService} from '../../../../time/tick.service';
import {CustomerService} from '../../../resource-services/customer.service';
import {FundService} from '../../../resource-services/fund.service';
import {ConfigurationService} from '../../../../configuration/configuration.service';
import {ITickSubscriber} from '../i-tick-subscriber';
import {hour} from '../../../../../environments/environment';
import {TickSubscriberBase} from '../tick-subscriber-base';

@Injectable()
export class CodeProfitAccumulatorService extends TickSubscriberBase implements ITickSubscriber {

   constructor(private customerService: CustomerService,
               private config: ConfigurationService,
               private fundService: FundService) {
      super();
   }

   public subscribe(tickService: TickService) {
      this.tickerSubscription = tickService.pipeline.subscribe((tick) => {
         let growth = this.profitPerMs(tick.msElapsed);
         if (growth > 0)
            this.fundService.add(growth);
      })
   }

   private profitPerMs(ms: number) {
      return ms * this.customerService.customers.$balanceFloored * this.config.CUSTOMERS_TO_PROFIT_RATE;
   }

   public get profitPerHr() {
      return this.profitPerMs(hour);
   }

   x
}
