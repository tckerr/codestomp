import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';

import {AppComponent} from './app.component';
import {TickService} from './services/tick/tick.service';
import {GameStorageService} from './services/game-storage.service';
import {GameComponent} from './website/game/game.component';
import {RouterModule, Routes} from '@angular/router';
import {NewGameComponent} from './website/new-game/new-game.component';
import {GameStateComponent} from './website/game/game-state/game-state.component';
import {NgbAlertConfig, NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {IdGeneratorService} from './services/id-generator.service';
import {LoggerService} from './services/logger-service';
import {LogHistoryComponent} from './website/game/log-history/log-history.component';
import {TickerSpeedComponent} from './website/game/game-state/ticker-speed/ticker-speed.component';
import {ManagementComponent} from './website/game/management/management.component';
import {DevelopmentComponent} from './website/game/management/business-units/development/development.component';
import {HRComponent} from './website/game/management/business-units/hr/hr.component';
import {GameSeedGeneratorService} from './services/game-seed-generator.service';
import {CodeService} from './services/resource-services/code.service';
import {DeploymentExecutor} from './services/devops/deployment-executor.service';
import {CustomerAccumulatorService} from './services/accumulators/customer-accumulator.service';
import {CodeBreakdownComponent} from './website/game/management/business-units/development/code-breakdown/code-breakdown.component';
import {AccumulationAggregatorService} from 'app/services/accumulators/accumulation-aggregator.service';
import {CodeProfitAccumulatorService} from './services/accumulators/code-profit-accumulator.service';
import {CustomerService} from './services/resource-services/customer.service';
import {FundService} from './services/resource-services/fund.service';
import {DebugComponent} from './website/game/management/business-units/debug/debug.component';
import {ConfigurationService} from './services/configuration.service';
import {DebugService} from './services/debug.service';
import {DevelopmentActionsComponent} from './website/game/management/business-units/development/development-actions/development-actions.component';
import {CompanyDigestComponent} from './website/game/management/company-digest/company-digest.component';
import {CommitGeneratorService} from './commit-generator.service';
import {UnlocksService} from './services/unlocks.service';
import {FundsDigestComponent} from './website/game/management/company-digest/funds-digest/funds-digest.component';
import {DateDigestComponent} from './website/game/management/company-digest/date-digest/date-digest.component';
import {CustomersDigestComponent} from './website/game/management/company-digest/customers-digest/customers-digest.component';
import {DevelopmentStaffComponent} from './website/game/management/business-units/development/development-staff/development-staff.component';
import {TalentGeneratorService} from './services/generators/talent-generator-service';
import {GeneratorAggregatorService} from './services/generators/generator-aggregator.service';
import {DeveloperStaffService} from './services/resource-services/developer-staff.service';
import {StaffActionAccumulatorService} from './services/accumulators/staff-actions/staff-action-accumulator.service';
import {StaffSalaryAccumulatorService} from './services/accumulators/staff-salary-accumulator.service';
import {QuitterNotificationService} from './services/quitter-notification.service';
import { AlertsDigestComponent } from './website/game/management/company-digest/alerts-digest/alerts-digest.component';
import {CodeWritingService} from './services/accumulators/staff-actions/development/code-writing.service';
import {CodeTestingService} from './services/accumulators/staff-actions/development/code-testing.service';
import {CodeDeploymentService} from './services/accumulators/staff-actions/development/code-deployment.service';
import {BugFixingService} from './services/accumulators/staff-actions/development/bug-fixing.service';
import {SpecialEventGeneratorService} from './services/generators/special-events/special-event-generator.service';
import {NotificationService} from './services/generators/special-events/notification.service';
import {TalentService} from "./services/resource-services/talent.service";
import {HiringService} from './services/hiring.service';
import {JobMarketComponent} from './website/game/management/job-market/job-market.component';
import {TalentCapacityBreakdownComponent} from './website/game/management/job-market/talent-capacity-breakdown/talent-capacity-breakdown.component';
import {StaffCategegoryIconResolverService} from './services/staff-categegory-icon-resolver.service';
import {StaffQuitDecisionService} from './services/accumulators/staff-actions/staff-quit-decision.service';

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
      DevelopmentStaffComponent,
      JobMarketComponent,
      AlertsDigestComponent,
      TalentCapacityBreakdownComponent,
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
      AccumulationAggregatorService,
      CodeProfitAccumulatorService,
      CustomerService,
      FundService,
      ConfigurationService,
      DebugService,
      CommitGeneratorService,
      UnlocksService,
      TalentGeneratorService,
      GeneratorAggregatorService,
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
      StaffCategegoryIconResolverService,
      StaffQuitDecisionService
   ],
   bootstrap: [AppComponent]
})
export class AppModule {
}
