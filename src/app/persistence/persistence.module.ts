import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {GameStorageService} from './game-storage.service';
import {GameSeedGeneratorService} from './game-seed-generator.service';
import {UtilitiesModule} from '../utilities/utilities.module';
import {ConfigurationModule} from '../configuration/configuration.module';

@NgModule({
   imports: [
      CommonModule,
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
