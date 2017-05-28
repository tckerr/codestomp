import {Component, OnInit} from '@angular/core';
import {FundService} from '../../../../services/resource-services/fund.service';
import {CustomerService} from '../../../../services/resource-services/customer.service';
import {CustomerAccumulatorService} from '../../../../services/accumulators/customer-accumulator.service';
import {CodeProfitAccumulatorService} from '../../../../services/accumulators/code-profit-accumulator.service';

@Component({
   selector: 'app-company-digest',
   templateUrl: './company-digest.component.html',
   styleUrls: ['./company-digest.component.css']
})
export class CompanyDigestComponent implements OnInit {

   constructor(private fundsService: FundService,
               private customerService: CustomerService,
               private customerAccumulatorService: CustomerAccumulatorService,
               private codeProfitAccumulatorService: CodeProfitAccumulatorService) {
   }

   ngOnInit() {
   }

}
