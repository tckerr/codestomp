import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';

import {AppComponent} from './app.component';
import {TickService} from './services/tick/tick.service';
import {GameStorageService} from './services/persistence/game-storage.service';
import {GameComponent} from './website/game/game.component';
import {RouterModule, Routes} from '@angular/router';
import {NewGameComponent} from './website/new-game/new-game.component';
import {GameStateComponent} from './website/game/game-state/game-state.component';
import {NgbAlertConfig, NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {IdGeneratorService} from './services/util/id-generator.service';
import {LoggerService} from './services/logging/logger-service';
import {LogHistoryComponent} from './website/game/log-history/log-history.component';
import {TickerSpeedComponent} from './website/game/game-state/ticker-speed/ticker-speed.component';
import {ManagementComponent} from './website/game/management/management.component';
import {DevelopmentComponent} from './website/game/management/business-units/development/development.component';
import {HRComponent} from './website/game/management/business-units/hr/hr.component';
import {GameSeedGeneratorService} from './services/persistence/game-seed-generator.service';
import {CodeService} from './services/resource-services/code.service';
import {CodeBreakdownComponent} from './website/game/management/business-units/development/code-breakdown/code-breakdown.component';
import {CustomerService} from './services/resource-services/customer.service';
import {FundService} from './services/resource-services/fund.service';
import {DebugComponent} from './website/game/management/business-units/debug/debug.component';
import {ConfigurationService} from './services/config/configuration.service';
import {DebugService} from './services/config/debug.service';
import {DevelopmentActionsComponent} from './website/game/management/business-units/development/development-actions/development-actions.component';
import {CompanyDigestComponent} from './website/game/management/company-digest/company-digest.component';
import {UnlocksService} from './services/unlocks.service';
import {FundsDigestComponent} from './website/game/management/company-digest/funds-digest/funds-digest.component';
import {DateDigestComponent} from './website/game/management/company-digest/date-digest/date-digest.component';
import {CustomersDigestComponent} from './website/game/management/company-digest/customers-digest/customers-digest.component';
import {StaffSummaryComponent} from './website/game/management/business-units/staff-summary/staff-summary.component';
import {DeveloperStaffService} from './services/staffing/developer-staff.service';
import {QuitterNotificationService} from './services/notifications/quitter-notification.service';
import { AlertsDigestComponent } from './website/game/management/company-digest/alerts-digest/alerts-digest.component';
import {NotificationService} from './services/notifications/notification.service';
import {TalentService} from './services/resource-services/talent.service';
import {HiringService} from './services/staffing/hiring.service';
import {JobMarketComponent} from './website/game/management/job-market/job-market.component';
import {TalentCapacityBreakdownComponent} from './website/game/management/job-market/talent-capacity-breakdown/talent-capacity-breakdown.component';
import {StaffCategoryIconResolverService} from './services/staffing/staff-category-icon-resolver.service';
import {StaffQuitDecisionService} from './services/staffing/staff-quit-decision.service';
import {DeploymentExecutor} from './services/tick/subscribers/manual/deployment-executor.service';
import {CustomerAccumulatorService} from './services/tick/subscribers/automatic/accumulators/customer-accumulator.service';
import {SubscriptionAggregationService} from './services/subscription-aggregation.service';
import {CodeProfitAccumulatorService} from './services/tick/subscribers/automatic/accumulators/code-profit-accumulator.service';
import {TalentGeneratorService} from './services/tick/subscribers/automatic/generators/talent-generator-service';
import {StaffActionAccumulatorService} from './services/tick/subscribers/automatic/accumulators/staff-actions/staff-action-accumulator.service';
import {StaffSalaryAccumulatorService} from 'app/services/tick/subscribers/automatic/accumulators/staff-salary-accumulator.service';
import {CodeWritingService} from './services/tick/subscribers/automatic/accumulators/staff-actions/development/code-writing.service';
import {CodeTestingService} from './services/tick/subscribers/automatic/accumulators/staff-actions/development/code-testing.service';
import {CodeDeploymentService} from './services/tick/subscribers/automatic/accumulators/staff-actions/development/code-deployment.service';
import {BugFixingService} from './services/tick/subscribers/automatic/accumulators/staff-actions/development/bug-fixing.service';
import {SpecialEventGeneratorService} from './services/tick/subscribers/automatic/generators/special-event-generator.service';
import {CommitGeneratorService} from './services/util/commit-generator.service';
import {DeploymentInfoService} from './services/resource-services/deployment-info.service';
import {AchievementsService} from './services/achievements/achievements.service';
import {AchievementUnlockListenerService} from 'app/services/tick/subscribers/automatic/listeners/achievement-unlock-listener.service';
import {AchievementUnlockerService} from './services/achievements/achievement-unlocker.service';
import {AchievementCriteriaValueResolverService} from './services/achievements/achievement-criteria-value-resolver.service';
import { AchievementProgressBarComponent } from './website/game/achievement-progress-bar/achievement-progress-bar.component';
import {AchievementEvaluatorService} from './services/achievements/achievement-evaluator.service';
import {BusinessUnitUnlockListenerService} from './services/listeners/business-unit-unlock-listener.service';
import { CorporateComponent } from './website/game/management/business-units/corporate/corporate.component';
import {SkillsService} from './services/resource-services/skills.service';
import { DevelopmentSkillsImprovementActionsComponent } from './website/game/management/business-units/development/development-actions/development-skills-improvement-actions/development-skills-improvement-actions.component';

const appRoutes: Routes = [
   {
      path: '',
      redirectTo: 'new',
      pathMatch: 'full'
   },
   {
      path: 'new',
      component: NewGameComponent
   },
   {
      path: 'game/:gameId',
      component: GameComponent,
      children: [
         {
            path: '',
            component: ManagementComponent,
            children: [
               {
                  path: '',
                  pathMatch: 'full',
                  redirectTo: 'development',
               },
               {
                  path: 'development',
                  component: DevelopmentComponent,
               },
               {
                  path: 'debug',
                  component: DebugComponent,
               },
               {
                  path: 'hr',
                  component: HRComponent
               },
               {
                  path: 'corporate',
                  component: CorporateComponent
               }
            ]
         }
      ]
   }
];

@NgModule({
   declarations: [
      AppComponent,
      GameComponent,
      NewGameComponent,
      GameStateComponent,
      LogHistoryComponent,
      TickerSpeedComponent,
      ManagementComponent,
      DevelopmentComponent,
      HRComponent,
      CodeBreakdownComponent,
      DebugComponent,
      DevelopmentActionsComponent,
      CompanyDigestComponent,
      FundsDigestComponent,
      DateDigestComponent,
      CustomersDigestComponent,
      StaffSummaryComponent,
      JobMarketComponent,
      AlertsDigestComponent,
      TalentCapacityBreakdownComponent,
      AchievementProgressBarComponent,
      CorporateComponent,
      DevelopmentSkillsImprovementActionsComponent,
   ],
   imports: [
      BrowserModule,
      FormsModule,
      HttpModule,
      RouterModule.forRoot(appRoutes),
      NgbModule.forRoot()
   ],
   providers: [
      TickService,
      GameStorageService,
      NgbAlertConfig,
      IdGeneratorService,
      LoggerService,
      GameSeedGeneratorService,
      CodeService,
      DeploymentExecutor,
      CustomerAccumulatorService,
      SubscriptionAggregationService,
      CodeProfitAccumulatorService,
      CustomerService,
      FundService,
      ConfigurationService,
      DebugService,
      CommitGeneratorService,
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
