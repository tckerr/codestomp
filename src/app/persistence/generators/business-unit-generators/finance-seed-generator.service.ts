import {Injectable} from '@angular/core';
import {ConfigurationService} from '../../../configuration/configuration.service';

@Injectable()
export class FinanceSeedGeneratorService {

   constructor(private config: ConfigurationService) {
   }

   public build() {
      return {
         id: 'finance',
         name: 'Finance',
         icon: 'fa-money',
         active: this.config.FINANCE_UNLOCKED_AT_START,
         staff: []
      };
   }
}
