import {DevelopmentBusinessUnit} from './development-business-unit';
import {BusinessUnits} from './business-units.enum';
import {BaseBusinessUnit} from './base-business-unit';

export class BusinessUnitClassResolver {

   static resolve(unitType: string) {
      switch (unitType){
         case BusinessUnits.Development:
            return DevelopmentBusinessUnit;
         default:
            return BaseBusinessUnit;
      }
   }
}
