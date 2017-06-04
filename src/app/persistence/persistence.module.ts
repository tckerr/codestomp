import {NgModule} from '@angular/core';
import {GameStorageService} from './game-storage.service';
import {GameSeedGeneratorService} from './game-seed-generator.service';
import {UtilitiesModule} from '../utilities/utilities.module';
import {ConfigurationModule} from '../configuration/configuration.module';

@NgModule({
   imports: [
      UtilitiesModule,
      ConfigurationModule
   ],
   declarations: [],
   providers: [
      GameStorageService,
      GameSeedGeneratorService,
   ]
})
export class PersistenceModule {
}
