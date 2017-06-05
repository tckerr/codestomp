import {Injectable} from '@angular/core';
import {ConfigurationService} from '../../../configuration/configuration.service';

@Injectable()
export class CorporateSeedGeneratorService {

   constructor(private config: ConfigurationService) {
   }

   build() {
      return {
         id: 'corporate',
         name: 'Corporate',
         icon: 'fa-sitemap',
         active: this.config.CORPORATE_UNLOCKED_AT_START,
         staff: []
      };
   }
}
