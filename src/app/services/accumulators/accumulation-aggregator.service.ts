import {Injectable} from '@angular/core';
import {CustomerAccumulatorService} from './customer-accumulator.service';
import {CodeProfitAccumulatorService} from './code-profit-accumulator.service';
import {StaffActionAccumulatorService} from './staff-actions/staff-action-accumulator.service';
import {StaffSalaryAccumulatorService} from './staff-salary-accumulator.service';
import {IAccumulator} from './iaccumulator';

@Injectable()
export class AccumulationAggregatorService {

   private accumulators: IAccumulator[] = [];

   constructor(customerAccumulator: CustomerAccumulatorService,
               developerCodeAccumulator: StaffActionAccumulatorService,
               staffSalaryAccumulatorService: StaffSalaryAccumulatorService,
               codeProfitAccumulator: CodeProfitAccumulatorService) {
      this.accumulators = [
         customerAccumulator,
         developerCodeAccumulator,
         staffSalaryAccumulatorService,
         codeProfitAccumulator
      ]
   }

   public start() {
      this.accumulators.forEach(a => a.start())
   }


}
