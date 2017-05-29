import {Injectable} from '@angular/core';
import {CustomerAccumulatorService} from './customer-accumulator.service';
import {CodeProfitAccumulatorService} from './code-profit-accumulator.service';
import {StaffActionAccumulatorService} from './staff-actions/staff-action-accumulator.service';
import {StaffSalaryAccumulatorService} from './staff-salary-accumulator.service';

@Injectable()
export class AccumulationAggregatorService {

   constructor(private customerAccumulator: CustomerAccumulatorService,
               private developerCodeAccumulator: StaffActionAccumulatorService,
               private staffSalaryAccumulatorService: StaffSalaryAccumulatorService,
               private codeProfitAccumulator: CodeProfitAccumulatorService) {
   }

   public start() {
      this.customerAccumulator.start();
      this.codeProfitAccumulator.start();
      this.developerCodeAccumulator.start();
      this.staffSalaryAccumulatorService.start();
   }


}
