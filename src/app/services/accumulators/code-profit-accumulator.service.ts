import {Injectable, OnDestroy} from '@angular/core';
import {TickService} from '../tick/tick.service';
import {CustomerService} from '../resource-services/customer.service';
import {Subscription} from 'rxjs/Subscription';
import {FundService} from '../resource-services/fund.service';
import {ConfigurationService} from '../configuration.service';
import {environment} from '../../../environments/environment';

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
      this.sub = this.tickService.pipeline.subscribe((tick) => {
         let growth = this.profitPerMs(tick.msElapsed);
         if (growth > 0)
            this.fundService.add(growth);
      })
   }

   private profitPerMs(ms: number) {
      return ms * this.customerService.customers.$balanceFloored * this.config.customersToProfitGrowthRate;
   }

   private get profitPerHr() {
      return this.profitPerMs(1000 * 60 * 60);
   }



}
