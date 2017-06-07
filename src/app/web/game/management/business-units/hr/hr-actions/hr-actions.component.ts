import { Component, OnInit } from '@angular/core';
import {ScoutingAction} from "../../../../../../game/business-units/hr/skill-actions/scouting-action";
import {ISkillAction} from "../../../../../../game/business-units/skill-actions/i-skill-action";

@Component({
  selector: 'app-hr-actions',
  templateUrl: './hr-actions.component.html',
  styleUrls: ['./hr-actions.component.css']
})
export class HrActionsComponent implements OnInit {

   constructor(private scoutingAction: ScoutingAction,) {
   }

   ngOnInit(): void {
   }

   public byIndex(index) {
      return index;
   }

   public get actions(): ISkillAction[] {
      return [
         this.scoutingAction,
      ];
   }

}
