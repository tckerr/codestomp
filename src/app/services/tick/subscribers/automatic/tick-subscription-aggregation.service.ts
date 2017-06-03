import {Injectable} from '@angular/core';
import {CustomerAccumulatorService} from './accumulators/customer-accumulator.service';
import {CodeProfitAccumulatorService} from './accumulators/code-profit-accumulator.service';
import {StaffActionAccumulatorService} from './accumulators/staff-actions/staff-action-accumulator.service';
import {StaffSalaryAccumulatorService} from './accumulators/staff-salary-accumulator.service';
import {ITickSubscriber} from './i-tick-subscriber';
import {TalentGeneratorService} from './generators/talent-generator-service';
import {SpecialEventGeneratorService} from './generators/special-event-generator.service';
import {TickService} from '../../tick.service';

@Injectable()
export class TickSubscriptionAggregationService {

   private subscribers: ITickSubscriber[] = [];

   constructor(private tickService: TickService,
               talentGeneratorService: TalentGeneratorService,
               specialEventGeneratorService: SpecialEventGeneratorService,
               customerAccumulator: CustomerAccumulatorService,
               developerCodeAccumulator: StaffActionAccumulatorService,
               staffSalaryAccumulatorService: StaffSalaryAccumulatorService,
               codeProfitAccumulator: CodeProfitAccumulatorService) {
      this.subscribers = [
         talentGeneratorService,
         specialEventGeneratorService,
         customerAccumulator,
         developerCodeAccumulator,
         staffSalaryAccumulatorService,
         codeProfitAccumulator
      ]
   }

   public start() {
      this.subscribers.forEach(a => a.subscribe(this.tickService));
   }


}
