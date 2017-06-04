import {NgModule} from '@angular/core';
import {GameStorageService} from './game-storage.service';
import {GameSeedGeneratorService} from './game-seed-generator.service';
import {UtilitiesModule} from '../utilities/utilities.module';
import {ConfigurationModule} from '../configuration/configuration.module';
import {DevelopmentSeedGeneratorService} from './business-unit-generators/development-seed-generator.service';
import {HrSeedGeneratorService} from './business-unit-generators/hr-seed-generator.service';
import {DebugSeedGeneratorService} from './business-unit-generators/debug-seed-generator.service';
import {CorporateSeedGeneratorService} from './business-unit-generators/corporate-seed-generator.service';
import {BusinessUnitsSeedGeneratorService} from './business-unit-generators/business-units-seed-generator.service';
import {MarketingSeedGeneratorService} from './business-unit-generators/marketing-seed-generator.service';
import {FinanceSeedGeneratorService} from './business-unit-generators/finance-seed-generator.service';

@NgModule({
   imports: [
      UtilitiesModule,
      ConfigurationModule
   ],
   declarations: [],
   providers: [
      GameStorageService,
      GameSeedGeneratorService,
      DevelopmentSeedGeneratorService,
      HrSeedGeneratorService,
      DebugSeedGeneratorService,
      CorporateSeedGeneratorService,
      BusinessUnitsSeedGeneratorService,
      MarketingSeedGeneratorService,
      FinanceSeedGeneratorService,
      BusinessUnitsSeedGeneratorService,
   ]
})
export class PersistenceModule {
}
