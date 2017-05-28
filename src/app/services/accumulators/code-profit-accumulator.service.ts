import {Injectable, OnDestroy} from '@angular/core';
import {TickService} from '../tick/tick.service';
import {CustomerService} from '../resource-services/customer.service';
import {Subscription} from 'rxjs/Subscription';
import {FundService} from '../resource-services/fund.service';
import {ConfigurationService} from '../configuration.service';

@Injectable()
export class CodeProfitAccumulatorService implements OnDestroy {
   private sub: Subscription;

   constructor(private tickService: TickService,
               private customerService: CustomerService,
               private config: ConfigurationService,
               private fundService: FundService) {
   }

   ngOnDestroy(): void {
      this.sub && this.sub.unsubscribe();
   }

   public start() {
      this.sub = this.tickService.pipeline.subscribe(() => {
         let growth = this.profitPerTick;
         if (growth > 0)
            this.fundService.add(growth);
      })
   }

   private get profitPerTick() {
      return this.customerService.customers.balance * this.config.customersToProfitGrowthRate;
   }

}
