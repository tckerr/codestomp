import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CorporateComponent} from './game/management/business-units/corporate/corporate.component';
import {AchievementProgressBarComponent} from './game/achievement-progress-bar/achievement-progress-bar.component';
import {TalentCapacityBreakdownComponent} from './game/management/job-market/talent-capacity-breakdown/talent-capacity-breakdown.component';
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
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {RouterModule} from '@angular/router';
import {GameModule} from '../game/game.module';
import { FinanceComponent } from './game/management/business-units/finance/finance.component';
import { MarketingComponent } from './game/management/business-units/marketing/marketing.component';
import { HrActionsComponent } from './game/management/business-units/hr/hr-actions/hr-actions.component';
import { ManualActionComponent } from './game/management/skill-actions/manual-action/manual-action.component';
import {SkillActionsImprovementComponent} from './game/management/skill-actions/skill-actions-improvement/skill-actions-improvement.component';
import { RecruitingMapComponent } from './game/management/business-units/hr/recruiting-map/recruiting-map/recruiting-map.component';
import {MapDataProviderService} from './game/management/business-units/hr/recruiting-map/map-data-provider.service';

@NgModule({
   imports: [
      BrowserModule,
      FormsModule,
      HttpModule,
      CommonModule,
      RouterModule,
      NgbModule.forRoot(),
      GameModule,
   ],
   providers: [
      MapDataProviderService,
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
      TalentCapacityBreakdownComponent,
      AchievementProgressBarComponent,
      CorporateComponent,
      SkillActionsImprovementComponent,
      FinanceComponent,
      MarketingComponent,
      HrActionsComponent,
      ManualActionComponent,
      RecruitingMapComponent,
   ]
})
export class WebModule {
}
