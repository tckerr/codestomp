import {Injectable} from '@angular/core';
import {CustomerAccumulatorService} from './customer-accumulator.service';
import {CodeProfitAccumulatorService} from './code-profit-accumulator.service';
import {DeveloperCodeAccumulatorService} from './developer-code-accumulator.service';
import {StaffSalaryAccumulatorService} from './staff-salary-accumulator.service';

@Injectable()
export class AccumulationAggregatorService {

   constructor(private customerAccumulator: CustomerAccumulatorService,
               private developerCodeAccumulator: DeveloperCodeAccumulatorService,
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
