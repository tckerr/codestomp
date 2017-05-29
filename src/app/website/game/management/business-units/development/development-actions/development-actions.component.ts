import {Component, OnInit} from '@angular/core';
import {CodeService} from '../../../../../../services/resource-services/code.service';
import {DeploymentService} from '../../../../../../services/devops/deployment.service';
import {ConfigurationService} from 'app/services/configuration.service';
import {UnlocksService} from '../../../../../../services/unlocks.service';
import {CommitGeneratorService} from '../../../../../../commit-generator.service';
import {LoggerService} from '../../../../../../services/logger-service';

@Component({
   selector: 'app-development-actions',
   templateUrl: './development-actions.component.html',
   styleUrls: ['./development-actions.component.css']
})
export class DevelopmentActionsComponent implements OnInit {

   constructor(private codeService: CodeService,
               private deploymentService: DeploymentService,
               private unlocksService: UnlocksService,
               private logger: LoggerService,
               private commitGeneratorService: CommitGeneratorService,
               private config: ConfigurationService) {
   }

   ngOnInit(): void {
   }

   private writeCode(val: number = 1) {
      let commit = this.commitGeneratorService.generate();
      this.logger.gameLog(commit);
      this.codeService.write(val);
   }

   private testCode(val: number = 1) {
      this.codeService.test(val);
   }

   private deploy() {
      this.deploymentService.deploy();
   }

   private get canDeploy() {
      return !this.deploymentService.deploying && this.codeService.tested.balance >= this.config.deployThreshold
   }

   private get deployBlockReason() {
      if (this.deploymentService.deploying)
         return 'Deploying...';
      let remaining = this.config.deployThreshold - this.codeService.tested.balance;
      return `${remaining} more to release`
   }

}
