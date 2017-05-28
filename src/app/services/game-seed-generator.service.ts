import {Injectable} from '@angular/core';
import {IdGeneratorService} from './id-generator.service';
import {environment} from '../../environments/environment';
import {BusinessUnits} from '../models/business-units/business-units.enum';
import * as moment from 'moment';

@Injectable()
export class GameSeedGeneratorService {

   constructor(private idGeneratorService: IdGeneratorService) {
   }

   public defaultSeed(): any {
      return {
         id: 'csgm_' + this.idGeneratorService.generate(),
         tick: 0,
         time: moment(environment.gameSettings.startTime).format(),
         company: {
            name: environment.gameSettings.defaults.companyName,
            unlocks: {
               manualTesting: 0,
               deployments: 0
            },
            resources: {
               funds: {
                  balance: environment.gameSettings.defaults.startingFunds,
                  totalAccumulated: environment.gameSettings.defaults.startingFunds
               },
               code: {
                  pushed: {
                     balance: 0,
                     totalAccumulated: 0
                  },
                  tested: {
                     balance: 0,
                     totalAccumulated: 0
                  },
                  deploying: {
                     balance: 0,
                     totalAccumulated: 0
                  },
                  prod: {
                     balance: 0,
                     totalAccumulated: 0
                  },
                  bugs: {
                     balance: 0,
                     totalAccumulated: 0
                  }
               },
               customers: {
                  balance: 0,
                  totalAccumulated: 0
               }
            },
            businessUnits: [
               {
                  id: BusinessUnits.HR,
                  name: 'Human Resources',
                  active: false
               },
               {
                  id: BusinessUnits.Debug,
                  name: 'Debug',
                  active: true
               },
               {
                  id: BusinessUnits.Development,
                  name: 'Development',
                  active: true,
                  spacesVsTabs: 'spaces',
                  staff: []
               }
            ]
         }
      }
   }
}
