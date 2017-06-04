import { Injectable } from '@angular/core';
import {ConfigurationService} from '../../configuration/configuration.service';

@Injectable()
export class MarketingSeedGeneratorService {

  constructor(
     private config: ConfigurationService
  ) { }

  public build(){
     return {
         id: 'marketing',
         name: 'Marketing',
         icon: 'fa-comments',
         active: this.config.MARKETING_UNLOCKED_AT_START,
         staff: []
      };
  }
}
