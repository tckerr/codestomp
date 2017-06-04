import {Component, OnInit} from '@angular/core';
import {CodeService} from '../../../../../../game/resource-services/code.service';
import {ConfigurationService} from 'app/configuration/configuration.service';
import {UnlocksService} from '../../../../../../game/achievements/unlocks.service';
import {CommitGeneratorService} from '../../../../../../utilities/commit-generator.service';
import {LoggerService} from '../../../../../../logging/logger-service';
import {TickService} from '../../../../../../time/tick.service';
import {Subscription} from 'rxjs/Subscription';
import {UnlockableFeature} from '../../../../../../models/achievements/unlockable-feature.enum';
import {SkillsService} from '../../../../../../game/resource-services/skills.service';
import {DeploymentExecutor} from '../../../../../../game/tick-subscribers/manual/deployment-executor.service';

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
               private skillsService: SkillsService,
               private commitGeneratorService: CommitGeneratorService,
               private config: ConfigurationService) {
   }

   ngOnInit(): void {
   }

   private writeCode(val: number = 1) {
      let commit = this.commitGeneratorService.generate();
      this.logger.gameLog(commit);
      let effectiveValue = val + this.config.CODE_GENERATED_CONSTANT;
      this.codeService.write(effectiveValue);
   }

   private get skills() {
      return this.skillsService.skills;
   }

   private testCode(val: number = 1) {
      let effectiveValue = val + this.config.CODE_TESTED_CONSTANT;
      this.codeService.test(effectiveValue, this.config.BASE_TESTING_FAILURE_PCT);
   }

   private fixBugs(val: number = 1) {
      let effectiveValue = val + this.config.BUG_FIX_CONSTANT;
      this.codeService.bugFix(effectiveValue);
   }


   private get manualTestingUnlocked() {
      return this.unlocksService.isUnlocked(UnlockableFeature.ManualTesting);
   }

   private get manualDeploymentsUnlocked() {
      return this.unlocksService.isUnlocked(UnlockableFeature.ManualDeployments);
   }

   private get manualBugFixesUnlocked() {
      return this.unlocksService.isUnlocked(UnlockableFeature.ManualBugFixes);
   }

   private deploy(val: number) {
      if (!this.canDeploy) {
         return 0;
      }
      this.queuedDeploy && this.queuedDeploy.unsubscribe();
      let effectiveValue = val + this.config.CODE_DEPLOY_CONSTANT;
      this.queuedDeploy = this.ticker.pipeline.take(1).subscribe(t => this.deploymentService.deploy(effectiveValue, t.date));
   }

   private get canDeploy() {
      return this.deploymentService.canDeploy;
   }

   private get deployBlockReason() {
      if (this.deploymentService.deploying)
         return 'Deploying...';
      let remaining = this.config.MINIMUM_TESTED_CODE_FOR_DEPLOY - this.codeService.tested.balance;
      return `Need ${Math.ceil(remaining)} more`
   }

}
