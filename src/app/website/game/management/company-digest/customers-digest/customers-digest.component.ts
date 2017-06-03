import {Component, OnInit} from '@angular/core';
import {CustomerService} from '../../../../../services/resource-services/customer.service';
import {CustomerAccumulatorService} from '../../../../../services/tick/subscribers/automatic/accumulators/customer-accumulator.service';
import {UnlocksService} from '../../../../../services/unlocks.service';
import {FundService} from '../../../../../services/resource-services/fund.service';

@Component({
   selector: 'app-customers-digest',
   templateUrl: './customers-digest.component.html',
   styleUrls: ['./customers-digest.component.css']
})
export class CustomersDigestComponent implements OnInit {

   constructor(private customerService: CustomerService,
               private customerAccumulatorService: CustomerAccumulatorService,
               private fundService: FundService,
   ) {
   }

   ngOnInit() {
   }

   private get unlocked(){
      return this.fundService.funds.totalAccumulated > 0;
   }


}
