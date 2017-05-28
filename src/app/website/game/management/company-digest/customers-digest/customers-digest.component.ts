import {Component, OnInit} from '@angular/core';
import {CustomerService} from '../../../../../services/resource-services/customer.service';
import {CustomerAccumulatorService} from '../../../../../services/accumulators/customer-accumulator.service';

@Component({
   selector: 'app-customers-digest',
   templateUrl: './customers-digest.component.html',
   styleUrls: ['./customers-digest.component.css']
})
export class CustomersDigestComponent implements OnInit {

   constructor(private customerService: CustomerService,
               private customerAccumulatorService: CustomerAccumulatorService) {
   }

   ngOnInit() {
   }

}
