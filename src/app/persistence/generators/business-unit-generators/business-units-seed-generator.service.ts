import {Injectable} from '@angular/core';
import {HrSeedGeneratorService} from './hr-seed-generator.service';
import {DevelopmentSeedGeneratorService} from './development-seed-generator.service';
import {CorporateSeedGeneratorService} from './corporate-seed-generator.service';
import {DebugSeedGeneratorService} from './debug-seed-generator.service';
import {FinanceSeedGeneratorService} from './finance-seed-generator.service';
import {MarketingSeedGeneratorService} from './marketing-seed-generator.service';

@Injectable()
export class BusinessUnitsSeedGeneratorService {

   constructor(
      private hrSeedGeneratorService: HrSeedGeneratorService,
      private developmentSeedGeneratorService: DevelopmentSeedGeneratorService,
      private corporateSeedGeneratorService: CorporateSeedGeneratorService,
      private debugSeedGeneratorService: DebugSeedGeneratorService,
      private financeSeedGeneratorService: FinanceSeedGeneratorService,
      private marketingSeedGeneratorService: MarketingSeedGeneratorService,
   ) {
   }

   public build() {
      return {

         corporate: this.corporateSeedGeneratorService.build(),
         hr: this.hrSeedGeneratorService.build(),
         debug: this.debugSeedGeneratorService.build(),
         development: this.developmentSeedGeneratorService.build(),
         finance: this.financeSeedGeneratorService.build(),
         marketing: this.marketingSeedGeneratorService.build(),
      }
   }
}
