import {NgModule} from '@angular/core';
import {TickService} from './tick.service';
import {PersistenceModule} from '../persistence/persistence.module';
import {ConfigurationModule} from '../configuration/configuration.module';

@NgModule({
   imports: [
      PersistenceModule,
      ConfigurationModule
   ],
   declarations: [],
   providers: [
      TickService
   ]
})
export class TimeModule {
}
