import {Injectable} from '@angular/core';
import {ConfigurationService} from '../../../configuration/configuration.service';

@Injectable()
export class DebugSeedGeneratorService {

   constructor(private config: ConfigurationService) {
   }

   build() {
      return {
         id: 'debug',
         name: 'Debug',
         icon: 'fa-code',
         active: this.config.DEBUG_UNLOCKED_AT_START,
         staff: []
      };
   }
}
