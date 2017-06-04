import {Component, OnInit} from '@angular/core';
import {CustomerService} from '../../../../../game/resource-services/customer.service';
import {FundService} from '../../../../../game/resource-services/fund.service';
import {CustomerAccumulatorService} from '../../../../../game/tick-subscribers/automatic/accumulators/customer-accumulator.service';

@Component({
   selector: 'app-customers-digest',
   templateUrl: './customers-digest.component.html',
   styleUrls: ['./customers-digest.component.css']
})
export class CustomersDigestComponent implements OnInit {

   constructor(private customerService: CustomerService,
               // TODO: extract shared dependency
               private customerAccumulatorService: CustomerAccumulatorService,
               private fundService: FundService,) {
   }

   ngOnInit() {
   }

   private get unlocked() {
      return this.fundService.funds.totalAccumulated > 0;
   }


}
