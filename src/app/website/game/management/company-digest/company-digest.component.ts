import {Component, OnInit} from '@angular/core';
import {CustomerService} from '../../../../services/resource-services/customer.service';
import {CustomerAccumulatorService} from '../../../../services/tick/subscribers/automatic/accumulators/customer-accumulator.service';

@Component({
   selector: 'app-company-digest',
   templateUrl: './company-digest.component.html',
   styleUrls: ['./company-digest.component.css']
})
export class CompanyDigestComponent implements OnInit {

   constructor(private customerService: CustomerService,
               private customerAccumulatorService: CustomerAccumulatorService) {
   }

   ngOnInit() { }

}
