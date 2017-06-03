import {Component, OnInit} from '@angular/core';
import {CodeService} from '../../../../../../services/resource-services/code.service';
import {ConfigurationService} from 'app/services/config/configuration.service';
import {UnlocksService} from '../../../../../../services/unlocks.service';
import {CommitGeneratorService} from '../../../../../../services/util/commit-generator.service';
import {LoggerService} from '../../../../../../services/logging/logger-service';
import {TickService} from '../../../../../../services/tick/tick.service';
import {Subscription} from "rxjs/Subscription";
import {DeploymentExecutor} from '../../../../../../services/tick/subscribers/manual/deployment-executor.service';

@Component({
   selector: 'app-development-actions',
   templateUrl: './development-actions.component.html',
   styleUrls: ['./development-actions.component.css']
})
export class DevelopmentActionsComponent implements OnInit {
   private queuedDeploy: Subscription;

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
      this.codeService.test(val, this.config.testsFailurePercentage);
   }

   private fixBugs(val: number = 1) {
      this.codeService.bugFix(val);
   }

   private deploy() {
      if (!this.canDeploy){
         return 0;
      }
      let count = this.config.deployThreshold;
      this.queuedDeploy && this.queuedDeploy.unsubscribe();
      this.queuedDeploy = this.ticker.pipeline.take(1).subscribe(t => this.deploymentService.deploy(count, t.date));
   }

   private get canDeploy() {
      return this.deploymentService.canDeploy;
   }

   private get deployBlockReason() {
      if (this.deploymentService.deploying)
         return 'Deploying...';
      let remaining = this.config.deployThreshold - this.codeService.tested.balance;
      return `Need ${Math.ceil(remaining)} more`
   }

}
