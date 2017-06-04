import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {NgbAlertConfig} from '@ng-bootstrap/ng-bootstrap';
import {IdGeneratorService} from './utilities/id-generator.service';
import {CodeService} from './services/resource-services/code.service';
import {CustomerService} from './services/resource-services/customer.service';
import {FundService} from './services/resource-services/fund.service';
import {UnlocksService} from './services/unlocks.service';
import {DeveloperStaffService} from './services/staffing/developer-staff.service';
import {QuitterNotificationService} from './services/notifications/quitter-notification.service';
import {NotificationService} from './services/notifications/notification.service';
import {TalentService} from './services/resource-services/talent.service';
import {HiringService} from './services/staffing/hiring.service';
import {StaffCategoryIconResolverService} from './services/staffing/staff-category-icon-resolver.service';
import {StaffQuitDecisionService} from './services/staffing/staff-quit-decision.service';
import {SubscriptionAggregationService} from './services/subscription-aggregation.service';
import {DeploymentInfoService} from './services/resource-services/deployment-info.service';
import {AchievementsService} from './services/achievements/achievements.service';
import {AchievementUnlockerService} from './services/achievements/achievement-unlocker.service';
import {AchievementCriteriaValueResolverService} from './services/achievements/achievement-criteria-value-resolver.service';
import {AchievementEvaluatorService} from './services/achievements/achievement-evaluator.service';
import {BusinessUnitUnlockListenerService} from './services/listeners/business-unit-unlock-listener.service';
import {SkillsService} from './services/resource-services/skills.service';
import {ConfigurationModule} from './configuration/configuration.module';
import {LoggingModule} from './logging/logging.module';
import {PersistenceModule} from './persistence/persistence.module';
import {UtilitiesModule} from './utilities/utilities.module';
import {TimeModule} from './time/time.module';
import {WebModule} from './web/web.module';
import {AppRoutingModule} from './app-routing/app-routing.module';
import {DeploymentExecutor} from './services/tick-subscribers/manual/deployment-executor.service';
import {CustomerAccumulatorService} from './services/tick-subscribers/automatic/accumulators/customer-accumulator.service';
import {CodeProfitAccumulatorService} from './services/tick-subscribers/automatic/accumulators/code-profit-accumulator.service';
import {TalentGeneratorService} from './services/tick-subscribers/automatic/generators/talent-generator-service';
import {StaffActionAccumulatorService} from './services/tick-subscribers/automatic/accumulators/staff-actions/staff-action-accumulator.service';
import {StaffSalaryAccumulatorService} from './services/tick-subscribers/automatic/accumulators/staff-salary-accumulator.service';
import {CodeWritingService} from './services/tick-subscribers/automatic/accumulators/staff-actions/development/code-writing.service';
import {CodeTestingService} from './services/tick-subscribers/automatic/accumulators/staff-actions/development/code-testing.service';
import {CodeDeploymentService} from './services/tick-subscribers/automatic/accumulators/staff-actions/development/code-deployment.service';
import {BugFixingService} from './services/tick-subscribers/automatic/accumulators/staff-actions/development/bug-fixing.service';
import {SpecialEventGeneratorService} from './services/tick-subscribers/automatic/generators/special-event-generator.service';
import {AchievementUnlockListenerService} from './services/tick-subscribers/automatic/listeners/achievement-unlock-listener.service';

@NgModule({
   declarations: [
      AppComponent,
   ],
   imports: [
      UtilitiesModule,
      ConfigurationModule,
      LoggingModule,
      PersistenceModule,
      TimeModule,
      WebModule,
      AppRoutingModule
   ],
   providers: [
      NgbAlertConfig,
      IdGeneratorService,
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
   ],
   bootstrap: [AppComponent]
})
export class AppModule {
}
