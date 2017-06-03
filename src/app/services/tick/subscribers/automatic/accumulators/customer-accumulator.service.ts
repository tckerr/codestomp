import {Injectable, OnDestroy} from '@angular/core';
import {TickService} from '../../../tick.service';
import {CodeService} from '../../../../resource-services/code.service';
import {Subscription} from 'rxjs/Subscription';
import {CustomerService} from '../../../../resource-services/customer.service';
import {ConfigurationService} from '../../../../config/configuration.service';
import {Tick} from '../../../../../models/tick/tick';
import {ITickSubscriber} from '../i-tick-subscriber';

@Injectable()
export class CustomerAccumulatorService implements OnDestroy, ITickSubscriber {
   private sub: Subscription;

   constructor(private codeService: CodeService,
               private customerService: CustomerService,
               private config: ConfigurationService) {
   }

   ngOnDestroy(): void {
      this.sub && this.sub.unsubscribe();
   }

   public subscribe(tickService: TickService) {
      this.sub = tickService.pipeline.subscribe((tick: Tick) => {
         let growth = this.customerGrowthForMs(tick.msElapsed);
         if (growth > 0)
            this.customerService.add(growth);
      })
   }

   public customerGrowthForMs(ms) {
      let netCodeBalance = this.codeService.prod.balance - this.codeService.bugs.balance;
      let deltaMax = this.getEligibleGrowth(netCodeBalance);
      let growthTarget = Math.min(deltaMax, netCodeBalance);
      let growthFromCode = this.growthFromCode(growthTarget, ms);
      let growthFromWordOfMouth = this.growthFromWordOfMouth(growthTarget, ms);
      return Math.min(deltaMax, (growthFromCode + growthFromWordOfMouth) || 0);
   }

   public get customersPerHr() {
      return this.customerGrowthForMs(1000 * 60 * 60);
   }

   private growthFromWordOfMouth(growthTarget: number,ms: number) {
      let share = this.config.wordOfMouthGrowthShare;
      let growthRate = this.config.wordOfMouthGrowthRate;
      return ms * share * growthTarget * growthRate;
   }

   private growthFromCode(growthTarget: number, ms: number) {
      let share = this.config.customersToDeployedCodeGrowthShare;
      let growthRate = this.config.customersToDeployedCodeGrowthRate;
      return ms * share * growthTarget * growthRate;
   }

   private getEligibleGrowth(netCodeBalance): number {
      let capPct = this.config.customersCapAsPercentOfCode;
      let cap = capPct * netCodeBalance;
      let eligible = cap - this.customerService.customers.balance;
      return eligible;
   }


}
