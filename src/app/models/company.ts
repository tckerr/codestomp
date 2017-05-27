import {BaseBusinessUnit} from "./business-units/base-business-unit";
import {BusinessUnitClassResolver} from './business-units/business-unit-class-resolver';

export class Company {
   public businessUnits: BaseBusinessUnit[] = [];
   public name: string;

   constructor(json: any){
      for (let unit of json.businessUnits){
         let businessUnit = this.buildBusinessUnit(unit);
         this.businessUnits.push(businessUnit);
      }
      this.name = json.name;
   }

   private buildBusinessUnit(unit) : BaseBusinessUnit {
      let businessUnitClass = BusinessUnitClassResolver.resolve(unit.id);
      return new businessUnitClass(unit);
   }
}
