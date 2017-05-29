import { Injectable } from '@angular/core';
import {DevelopmentBusinessUnit} from '../../models/business-units/development/development-business-unit';
import {BusinessUnits} from '../../models/business-units/business-units.enum';
import {GameStorageService} from '../game-storage.service';

@Injectable()
export class DevelopmentBusinessUnitAccessorService {

  constructor(private gameStorageService: GameStorageService,) { }

   public get businessUnit(): DevelopmentBusinessUnit {
      let businessUnits = this.gameStorageService.game.company.businessUnits;
      for (let i = 0; i < businessUnits.length; ++i) {
         if (businessUnits[i].id == BusinessUnits.Development)
            return (<DevelopmentBusinessUnit>businessUnits[i]);
      }
      throw Error('Business unit not found!');
   }
}
