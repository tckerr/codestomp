import {Injectable, OnDestroy} from '@angular/core';
import {TickService} from '../tick/tick.service';
import {CodeService} from '../resource-services/code.service';
import {Subscription} from 'rxjs/Subscription';
import {CustomerService} from '../resource-services/customer.service';
import {ConfigurationService} from '../configuration.service';
import {Tick} from '../../models/tick';

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

   public start() {
      this.sub = this.tickService.pipeline.subscribe((tick: Tick) => {
         let growth = this.customerGrowthForMs(tick.msElapsed);
         if (growth > 0)
            this.customerService.add(growth || 0);
      })
   }

   public customerGrowthForMs(ms) {
      let netCodeBalance = this.codeService.prod.balance - this.codeService.bugs.balance;
      let growthCeiling = this.growthCeiling(netCodeBalance);
      let growthTarget = Math.min(growthCeiling, netCodeBalance);
      let growthFromCode = this.growthFromCode(growthTarget, ms);
      let growthFromWordOfMouth = this.growthFromWordOfMouth(growthTarget, ms);
      return Math.min(growthCeiling, (growthFromCode + growthFromWordOfMouth) || 0);
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

   private growthCeiling(netCodeBalance): number {
      let capPct = this.config.customersCapAsPercentOfCode;
      let cap = capPct * netCodeBalance;
      let eligible = cap - this.customerService.customers.balance;
      return eligible;
   }


}
