import {Injectable, OnDestroy} from '@angular/core';
import {TickService} from '../tick/tick.service';
import {CodeService} from '../resource-services/code.service';
import {Subscription} from 'rxjs/Subscription';
import {CustomerService} from '../resource-services/customer.service';
import {ConfigurationService} from '../configuration.service';

@Injectable()
export class CustomerAccumulatorService implements OnDestroy {
   private sub: Subscription;

   constructor(private codeService: CodeService,
               private customerService: CustomerService,
               private config: ConfigurationService,
               private tickService: TickService) {
   }

   ngOnDestroy(): void {
      this.sub && this.sub.unsubscribe();
   }

   public start(){
      this.sub = this.tickService.pipeline.subscribe(() => {
         let growth = this.customersPerTick;
         if (growth > 0)
            this.customerService.add(growth || 0);
      })
   }

   public get customersPerTick() {
      let netCodeBalance = this.codeService.prod.balance - this.codeService.bugs.balance;
      let growthFromCode = netCodeBalance * this.config.customersToDeployedCodeGrowthRate;
      let growthFromWordOfMouth = this.customerService.customers.balance * this.config.wordOfMouthGrowthRate;
      return (growthFromCode + growthFromWordOfMouth) || 0;
   }


}
