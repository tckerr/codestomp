import {NgModule} from '@angular/core';
import {CodeService} from './resource-services/code.service';
import {DeploymentExecutor} from './tick-subscribers/manual/deployment-executor.service';
import {CustomerAccumulatorService} from './tick-subscribers/automatic/accumulators/customer-accumulator.service';
import {SubscriptionAggregationService} from './tick-subscribers/subscription-aggregation.service';
import {CodeProfitAccumulatorService} from './tick-subscribers/automatic/accumulators/code-profit-accumulator.service';
import {CustomerService} from './resource-services/customer.service';
import {FundService} from './resource-services/fund.service';
import {UnlocksService} from './achievements/unlocks.service';
import {TalentGeneratorService} from './tick-subscribers/automatic/generators/talent-generator-service';
import {DeveloperStaffService} from './staffing/developer-staff.service';
import {StaffActionAccumulatorService} from './tick-subscribers/automatic/accumulators/staff-actions/staff-action-accumulator.service';
import {StaffSalaryAccumulatorService} from './tick-subscribers/automatic/accumulators/staff-salary-accumulator.service';
import {QuitterNotificationService} from './notifications/quitter-notification.service';
import {CodeWritingService} from './tick-subscribers/automatic/accumulators/staff-actions/development/code-writing.service';
import {CodeTestingService} from './tick-subscribers/automatic/accumulators/staff-actions/development/code-testing.service';
import {CodeDeploymentService} from './tick-subscribers/automatic/accumulators/staff-actions/development/code-deployment.service';
import {BugFixingService} from './tick-subscribers/automatic/accumulators/staff-actions/development/bug-fixing.service';
import {SpecialEventGeneratorService} from './tick-subscribers/automatic/generators/special-event-generator.service';
import {NotificationService} from './notifications/notification.service';
import {TalentService} from './resource-services/talent.service';
import {HiringService} from './staffing/hiring.service';
import {StaffCategoryIconResolverService} from './staffing/staff-category-icon-resolver.service';
import {StaffQuitDecisionService} from './staffing/staff-quit-decision.service';
import {DeploymentInfoService} from './resource-services/deployment-info.service';
import {AchievementsService} from './achievements/achievements.service';
import {AchievementUnlockListenerService} from './tick-subscribers/automatic/listeners/achievement-unlock-listener.service';
import {AchievementCriteriaValueResolverService} from './achievements/achievement-criteria-value-resolver.service';
import {AchievementUnlockerService} from './achievements/achievement-unlocker.service';
import {AchievementEvaluatorService} from './achievements/achievement-evaluator.service';
import {BusinessUnitUnlockListenerService} from './listeners/business-unit-unlock-listener.service';
import {SkillsService} from './resource-services/skills.service';
import {UtilitiesModule} from '../utilities/utilities.module';
import {ConfigurationModule} from '../configuration/configuration.module';
import {LoggingModule} from '../logging/logging.module';
import {PersistenceModule} from '../persistence/persistence.module';
import {TimeModule} from '../time/time.module';

@NgModule({
   imports: [
      UtilitiesModule,
      ConfigurationModule,
      LoggingModule,
      PersistenceModule,
      TimeModule,
   ],
   exports: [],
   declarations: [],
   providers: [
      CodeService,
      DeploymentExecutor,
      CustomerAccumulatorService,
      SubscriptionAggregationService,
      CodeProfitAccumulatorService,
      CustomerService,
      FundService,
      UnlocksService,
      TalentGeneratorService,
      DeveloperStaffService,
      StaffActionAccumulatorService,
      StaffSalaryAccumulatorService,
      QuitterNotificationService,
      CodeWritingService,
      CodeTestingService,
      CodeDeploymentService,
      BugFixingService,
      SpecialEventGeneratorService,
      NotificationService,
      TalentService,
      HiringService,
      StaffCategoryIconResolverService,
      StaffQuitDecisionService,
      DeploymentInfoService,
      AchievementsService,
      AchievementUnlockListenerService,
      AchievementCriteriaValueResolverService,
      AchievementUnlockerService,
      AchievementEvaluatorService,
      BusinessUnitUnlockListenerService,
      SkillsService,
   ]
})
export class GameModule {
}
