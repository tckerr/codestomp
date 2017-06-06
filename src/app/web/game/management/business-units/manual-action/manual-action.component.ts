import {Component, Input, OnInit} from '@angular/core';
import {IManualAction} from '../../../../../game/business-units/manual-actions/i-manual-action';

@Component({
   selector: 'app-manual-action',
   templateUrl: './manual-action.component.html',
   styleUrls: ['./manual-action.component.css']
})
export class ManualActionComponent implements OnInit {

   @Input() action: IManualAction;

   constructor() {
   }

   ngOnInit() {
   }

}
