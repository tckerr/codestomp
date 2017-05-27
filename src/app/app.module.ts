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
import { LogHistoryComponent } from './website/game/log-history/log-history.component';

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
      path: 'game/:id',
      component: GameComponent
   }
];

@NgModule({
   declarations: [
      AppComponent,
      GameComponent,
      NewGameComponent,
      GameStateComponent,
      LogHistoryComponent,
   ],
   imports: [
      BrowserModule,
      FormsModule,
      HttpModule,
      RouterModule.forRoot(appRoutes),
      NgbModule
   ],
   providers: [
      TickService,
      GameStorageService,
      NgbAlertConfig,
      IdGeneratorService,
      LoggerService
   ],
   bootstrap: [AppComponent]
})
export class AppModule {
}
