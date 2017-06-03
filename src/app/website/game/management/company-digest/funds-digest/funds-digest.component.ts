import {Component, OnInit} from '@angular/core';
import {FundService} from '../../../../../services/resource-services/fund.service';
import {CodeProfitAccumulatorService} from '../../../../../services/tick/subscribers/automatic/accumulators/code-profit-accumulator.service';
import {StaffSalaryAccumulatorService} from '../../../../../services/tick/subscribers/automatic/accumulators/staff-salary-accumulator.service';

@Component({
   selector: 'app-funds-digest',
   templateUrl: './funds-digest.component.html',
   styleUrls: ['./funds-digest.component.css']
})
export class FundsDigestComponent implements OnInit {

   constructor(private fundsService: FundService,
               private codeProfitAccumulatorService: CodeProfitAccumulatorService,
               private staffSalaryAccumulatorService: StaffSalaryAccumulatorService) {
   }

   ngOnInit() {
   }

   public get profitPerHour() {
      return this.codeProfitAccumulatorService.profitPerHr
         - this.staffSalaryAccumulatorService.costsPerHour;
   }
   public get bgColor() {
      let pph = this.profitPerHour;
      let fundsNegative = this.fundsService.funds.balance < 0;
      if (fundsNegative || (pph < 0 && this.fundsService.funds.balance < Math.abs(pph)))
         return 'card-danger';
      return pph >= 0 ? 'card-success' : "card-warning"
   }

}
