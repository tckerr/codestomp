import {Injectable, OnDestroy} from '@angular/core';
import {UnlockableFeature} from '../../../../models/achievements/unlockable-feature.enum';
import {CodeService} from '../../../resource-services/code.service';
import {ConfigurationService} from '../../../../configuration/configuration.service';
import {UnlocksService} from '../../../achievements/unlocks.service';
import {SkillsService} from '../../../resource-services/skills.service';
import {DeploymentExecutor} from '../../../tick-subscribers/manual/deployment-executor.service';
import {Subscription} from 'rxjs/Subscription';
import {TickService} from '../../../../time/tick.service';
import {ImprovableSkill} from '../../skill-actions/improvable-skill';
import {FundService} from '../../../resource-services/fund.service';
import {ISkillAction} from '../../skill-actions/i-skill-action';

@Injectable()
export class DeploymentAction extends ImprovableSkill implements ISkillAction, OnDestroy {
   public skillId = 'deploying';
   public buttonTheme = 'btn-warning';
   public popoverContents = `
      Tested code must be <strong>deployed</strong> to production before 
      any funds can be earned from it. Deploy fast and often!`;
   public iconClass = 'fa-ship';
   private queuedDeploy: Subscription;


   constructor(private codeService: CodeService,
               private config: ConfigurationService,
               private unlocksService: UnlocksService,
               private deploymentExecutor: DeploymentExecutor,
               private ticker: TickService,
               skillsService: SkillsService,
               fundService: FundService) {
      super(skillsService, fundService);
   }

   public get value() {
      return this.skillsService.skills.deploying.balance + this.config.CODE_DEPLOY_CONSTANT;
   }

   public execute() {
      if (this.disabled) {
         return 0;
      }
      this.ngOnDestroy();
      let cachedValue = this.value;
      this.queuedDeploy = this.ticker.pipeline
         .take(1)
         .subscribe(t => this.deploymentExecutor.deploy(cachedValue, t.date));
   }

   public get visible() {
      return this.unlocksService.isUnlocked(UnlockableFeature.ManualDeployments);
   }

   public get disabled() {
      return !this.deploymentExecutor.canDeploy;
   }

   public get label() {
      return this.deploymentExecutor.canDeploy ? 'Ship it to prod' : this.deployBlockReason;
   }

   private get deployBlockReason() {
      if (this.deploymentExecutor.deploying)
         return 'Deploying...';
      let remaining = this.config.MINIMUM_TESTED_CODE_FOR_DEPLOY - this.codeService.tested.balance;
      return `Need ${Math.ceil(remaining)} more`
   }

   ngOnDestroy(): void {
      if (this.queuedDeploy)
         this.queuedDeploy.unsubscribe();
   }

}
