import {Component, Input, OnInit} from '@angular/core';
import {ISkillAction} from '../../../../../game/business-units/skill-actions/i-skill-action';

@Component({
   selector: 'app-manual-action',
   templateUrl: './manual-action.component.html',
   styleUrls: ['./manual-action.component.css']
})
export class ManualActionComponent implements OnInit {

   @Input() action: ISkillAction;

   constructor() {
   }

   ngOnInit() {
   }

}
