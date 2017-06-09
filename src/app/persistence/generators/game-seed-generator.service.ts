import {Injectable} from '@angular/core';
import {IdGeneratorService} from '../../utilities/id-generator.service';
import * as moment from 'moment';
import {UnlockableFeature} from '../../models/achievements/unlockable-feature.enum';
import {EnumParserService} from '../../utilities/enum-parser.service';
import {ConfigurationService} from '../../configuration/configuration.service';
import {BusinessUnitsSeedGeneratorService} from './business-unit-generators/business-units-seed-generator.service';
import {AchievementsSeedGeneratorService} from "./achievements-seed-generator.service";
import {ResourcesSeedGeneratorService} from "./resources-seed-generator.service";


@Injectable()
export class GameSeedGeneratorService {

   constructor(private idGeneratorService: IdGeneratorService,
               private config: ConfigurationService,
               private businessUnitsSeedGeneratorService: BusinessUnitsSeedGeneratorService,
               private achievementsSeedGeneratorService: AchievementsSeedGeneratorService,
               private resourcesSeedGeneratorService: ResourcesSeedGeneratorService,
               private enumParser: EnumParserService) {
   }

   public defaultSeed(): any {
      let unlockedFeatures = {};
      this.enumParser.getMembers(UnlockableFeature).forEach(a => unlockedFeatures[a] = false);

      let seed = {
         id: this.idGeneratorService.generate(),
         tick: 0,
         time: moment(this.config.INITIAL_GAME_DATE).format(),
         marketResources: {
            talent: {
               balance: 0,
               totalAccumulated: 0,
               canBeNegative: false
            },
            prospecting: {

            }
         },
         unlockedFeatures: unlockedFeatures,
         achievementTracks: this.achievementsSeedGeneratorService.build(),
         company: {
            name: 'T-Corp',
            resources: this.resourcesSeedGeneratorService.build(),
            businessUnits: this.businessUnitsSeedGeneratorService.build()
         }
      };
      return seed;
   };
}



