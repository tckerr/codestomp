import { Component, OnInit } from '@angular/core';
import {FundService} from '../../../../../services/resource-services/fund.service';
import {CodeProfitAccumulatorService} from '../../../../../services/accumulators/code-profit-accumulator.service';

@Component({
  selector: 'app-funds-digest',
  templateUrl: './funds-digest.component.html',
  styleUrls: ['./funds-digest.component.css']
})
export class FundsDigestComponent implements OnInit {

  constructor(private fundsService: FundService,
              private codeProfitAccumulatorService: CodeProfitAccumulatorService) { }

  ngOnInit() {
  }

}
