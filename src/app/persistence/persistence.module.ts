import {NgModule} from '@angular/core';
import {GameStorageService} from './game-storage.service';
import {GameSeedGeneratorService} from './generators/game-seed-generator.service';
import {UtilitiesModule} from '../utilities/utilities.module';
import {ConfigurationModule} from '../configuration/configuration.module';
import {DevelopmentSeedGeneratorService} from './generators/business-unit-generators/development-seed-generator.service';
import {HrSeedGeneratorService} from './generators/business-unit-generators/hr-seed-generator.service';
import {DebugSeedGeneratorService} from './generators/business-unit-generators/debug-seed-generator.service';
import {CorporateSeedGeneratorService} from './generators/business-unit-generators/corporate-seed-generator.service';
import {BusinessUnitsSeedGeneratorService} from './generators/business-unit-generators/business-units-seed-generator.service';
import {MarketingSeedGeneratorService} from './generators/business-unit-generators/marketing-seed-generator.service';
import {FinanceSeedGeneratorService} from './generators/business-unit-generators/finance-seed-generator.service';
import {AchievementsSeedGeneratorService} from "./generators/achievements-seed-generator.service";
import {ResourcesSeedGeneratorService} from "./generators/resources-seed-generator.service";

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
      ResourcesSeedGeneratorService,
      AchievementsSeedGeneratorService,
   ]
})
export class PersistenceModule {
}
