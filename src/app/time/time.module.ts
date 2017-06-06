import {NgModule} from '@angular/core';
import {TickService} from './tick.service';
import {PersistenceModule} from '../persistence/persistence.module';
import {ConfigurationModule} from '../configuration/configuration.module';
import {TimeOfDayProductivityWeighterService} from '../models/tick/time-of-day-productivity-weighter.service';

@NgModule({
   imports: [
      PersistenceModule,
      ConfigurationModule
   ],
   declarations: [],
   providers: [
      TickService,
      TimeOfDayProductivityWeighterService
   ]
})
export class TimeModule {
}
