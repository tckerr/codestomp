import {Injectable, OnDestroy} from '@angular/core';
import {TickService} from '../../../tick.service';
import {CustomerService} from '../../../../resource-services/customer.service';
import {Subscription} from 'rxjs/Subscription';
import {FundService} from '../../../../resource-services/fund.service';
import {ConfigurationService} from '../../../../config/configuration.service';
import {ITickSubscriber} from '../i-tick-subscriber';
import {perHour} from "../../../../../../environments/environment";

@Injectable()
export class CodeProfitAccumulatorService implements OnDestroy, ITickSubscriber {
   private sub: Subscription;

   constructor(private customerService: CustomerService,
               private config: ConfigurationService,
               private fundService: FundService) {
   }

   ngOnDestroy(): void {
      this.sub && this.sub.unsubscribe();
   }

   public subscribe(tickService: TickService) {
      this.sub = tickService.pipeline.subscribe((tick) => {
         let growth = this.profitPerMs(tick.msElapsed);
         if (growth > 0)
            this.fundService.add(growth);
      })
   }

   private profitPerMs(ms: number) {
      return ms * this.customerService.customers.$balanceFloored * this.config.customersToProfitGrowthRate;
   }

   public get profitPerHr() {
      return this.profitPerMs(perHour);
   }
   x
}
