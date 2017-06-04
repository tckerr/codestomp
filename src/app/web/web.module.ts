import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DevelopmentSkillsImprovementActionsComponent} from './game/management/business-units/development/development-actions/development-skills-improvement-actions/development-skills-improvement-actions.component';
import {CorporateComponent} from './game/management/business-units/corporate/corporate.component';
import {AchievementProgressBarComponent} from './game/achievement-progress-bar/achievement-progress-bar.component';
import {TalentCapacityBreakdownComponent} from './game/management/job-market/talent-capacity-breakdown/talent-capacity-breakdown.component';
import {AlertsDigestComponent} from './game/management/company-digest/alerts-digest/alerts-digest.component';
import {GameComponent} from './game/game.component';
import {NewGameComponent} from './game/new-game/new-game.component';
import {GameStateComponent} from './game/game-state/game-state.component';
import {LogHistoryComponent} from './game/log-history/log-history.component';
import {TickerSpeedComponent} from './game/game-state/ticker-speed/ticker-speed.component';
import {ManagementComponent} from './game/management/management.component';
import {DevelopmentComponent} from './game/management/business-units/development/development.component';
import {HRComponent} from './game/management/business-units/hr/hr.component';
import {CodeBreakdownComponent} from './game/management/business-units/development/code-breakdown/code-breakdown.component';
import {DebugComponent} from './game/management/business-units/debug/debug.component';
import {DevelopmentActionsComponent} from './game/management/business-units/development/development-actions/development-actions.component';
import {CompanyDigestComponent} from './game/management/company-digest/company-digest.component';
import {FundsDigestComponent} from './game/management/company-digest/funds-digest/funds-digest.component';
import {DateDigestComponent} from './game/management/company-digest/date-digest/date-digest.component';
import {CustomersDigestComponent} from './game/management/company-digest/customers-digest/customers-digest.component';
import {StaffSummaryComponent} from './game/management/business-units/staff-summary/staff-summary.component';
import {JobMarketComponent} from './game/management/job-market/job-market.component';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import {RouterModule, Routes} from '@angular/router';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

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
   imports: [
      BrowserModule,
      FormsModule,
      HttpModule,
      CommonModule,
      NgbModule.forRoot(),
      RouterModule.forRoot(appRoutes),
   ],
   exports : [
     RouterModule 
   ],
   declarations: [
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
   ]
})
export class WebModule {
}
