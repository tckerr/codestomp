import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CorporateComponent} from '../web/game/management/business-units/corporate/corporate.component';
import {HRComponent} from '../web/game/management/business-units/hr/hr.component';
import {DebugComponent} from '../web/game/management/business-units/debug/debug.component';
import {DevelopmentComponent} from '../web/game/management/business-units/development/development.component';
import {ManagementComponent} from '../web/game/management/management.component';
import {GameComponent} from '../web/game/game.component';
import {NewGameComponent} from '../web/game/new-game/new-game.component';
import {Routes, RouterModule} from '@angular/router';
import {WebModule} from '../web/web.module';

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
      CommonModule,
      WebModule,
      RouterModule.forRoot(appRoutes)
   ],
   exports: [
      RouterModule
   ],
   declarations: []
})
export class AppRoutingModule {
}
