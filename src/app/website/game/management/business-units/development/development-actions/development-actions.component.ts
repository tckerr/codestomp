import {Component, OnInit} from '@angular/core';
import {CodeService} from '../../../../../../services/resource-services/code.service';
import {DeploymentExecutor} from '../../../../../../services/devops/deployment-executor.service';
import {ConfigurationService} from 'app/services/configuration.service';
import {UnlocksService} from '../../../../../../services/unlocks.service';
import {CommitGeneratorService} from '../../../../../../commit-generator.service';
import {LoggerService} from '../../../../../../services/logger-service';
import {TickService} from '../../../../../../services/tick/tick.service';

@Component({
   selector: 'app-development-actions',
   templateUrl: './development-actions.component.html',
   styleUrls: ['./development-actions.component.css']
})
export class DevelopmentActionsComponent implements OnInit {

   constructor(private codeService: CodeService,
               private deploymentService: DeploymentExecutor,
               private unlocksService: UnlocksService,
               private logger: LoggerService,
               private ticker: TickService,
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
      let count = this.codeService.tested.balance;
      this.ticker.pipeline.take(1).subscribe(t => this.deploymentService.deploy(count, t.date))
   }

   private get canDeploy() {
      return this.deploymentService.canDeploy
   }

   private get deployBlockReason() {
      if (this.deploymentService.deploying)
         return 'Deploying...';
      let remaining = this.config.deployThreshold - this.codeService.tested.balance;
      return `${Math.floor(remaining)} more to release`
   }

}
