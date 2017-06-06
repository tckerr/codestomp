import {Component, OnInit} from '@angular/core';
import {IManualAction} from '../../../../../../game/business-units/manual-actions/i-manual-action';
import {TestingAction} from '../../../../../../game/business-units/development/manual-actions/testing-action';
import {CodingAction} from '../../../../../../game/business-units/development/manual-actions/coding-action';
import {DeploymentAction} from '../../../../../../game/business-units/development/manual-actions/deployment-action';
import {BugfixAction} from '../../../../../../game/business-units/development/manual-actions/bugfix-action';

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

   public get actions(): IManualAction[] {
      return [
         this.codingAction,
         this.testingAction,
         this.deploymentAction,
         this.bugfixAction];
   }


}
