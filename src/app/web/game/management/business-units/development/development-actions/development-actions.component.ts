import {Component, OnInit} from '@angular/core';
import {TestingAction} from '../../../../../../game/business-units/development/skill-actions/testing-action';
import {CodingAction} from '../../../../../../game/business-units/development/skill-actions/coding-action';
import {DeploymentAction} from '../../../../../../game/business-units/development/skill-actions/deployment-action';
import {BugfixAction} from '../../../../../../game/business-units/development/skill-actions/bugfix-action';
import {ISkillAction} from '../../../../../../game/business-units/skill-actions/i-skill-action';

@Component({
   selector: 'app-development-actions',
   templateUrl: './development-actions.component.html',
   styleUrls: ['./development-actions.component.css']
})
export class DevelopmentActionsComponent implements OnInit {

   constructor(private testingAction: TestingAction,
               private codingAction: CodingAction,
               private deploymentAction: DeploymentAction,
               private bugfixAction: BugfixAction,) {
   }

   ngOnInit(): void {
   }

   public byIndex(index) {
      return index;
   }

   public get actions(): ISkillAction[] {
      return [
         this.codingAction,
         this.testingAction,
         this.deploymentAction,
         this.bugfixAction];
   }


}
