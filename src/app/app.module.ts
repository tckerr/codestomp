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
import {NgbAlertConfig, NgbCalendar, NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {IdGeneratorService} from './services/id-generator.service';
import {LoggerService} from './services/logger-service';
import {LogHistoryComponent} from './website/game/log-history/log-history.component';
import {TickerSpeedComponent} from './website/game/game-state/ticker-speed/ticker-speed.component';
import {ManagementComponent} from './website/game/management/management.component';
import {DevelopmentComponent} from './website/game/management/business-units/development/development.component';
import {HRComponent} from './website/game/management/business-units/hr/hr.component';
import {BusinessUnits} from './models/business-units/business-units.enum';
import {GameSeedGeneratorService} from './services/game-seed-generator.service';
import {DeveloperComponent} from './website/game/management/business-units/development/developer/developer.component';
import {CodeService} from './services/resource-services/code.service';
import {DeploymentService} from './services/devops/deployment.service';
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
import { FundsDigestComponent } from './website/game/management/company-digest/funds-digest/funds-digest.component';
import { DateDigestComponent } from './website/game/management/company-digest/date-digest/date-digest.component';
import { CustomersDigestComponent } from './website/game/management/company-digest/customers-digest/customers-digest.component';

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
            redirectTo: 'management',
            pathMatch: 'full'
         },
         {
            path: 'management',
            component: ManagementComponent,
            children: [
               {
                  path: '',
                  redirectTo: BusinessUnits.Development,
                  pathMatch: 'full'
               },
               {
                  path: BusinessUnits.Development,
                  component: DevelopmentComponent
               },
               {
                  path: BusinessUnits.Debug,
                  component: DebugComponent
               },
               {
                  path: BusinessUnits.HR,
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
      DeveloperComponent,
      CodeBreakdownComponent,
      DebugComponent,
      DevelopmentActionsComponent,
      CompanyDigestComponent,
      FundsDigestComponent,
      DateDigestComponent,
      CustomersDigestComponent,
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
      DeploymentService,
      CustomerAccumulatorService,
      AccumulationAggregatorService,
      CodeProfitAccumulatorService,
      CustomerService,
      FundService,
      ConfigurationService,
      DebugService,
      CommitGeneratorService,
      UnlocksService
   ],
   bootstrap: [AppComponent]
})
export class AppModule {
}
