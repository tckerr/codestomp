import {Injectable} from '@angular/core';
import {CustomerAccumulatorService} from './customer-accumulator.service';
import {CodeProfitAccumulatorService} from './code-profit-accumulator.service';

@Injectable()
export class AccumulationAggregatorService {

   constructor(private customerAccumulator: CustomerAccumulatorService,
               private codeProfitAccumulator: CodeProfitAccumulatorService) {
   }

   public start() {
      this.customerAccumulator.start();
      this.codeProfitAccumulator.start();
   }



}
