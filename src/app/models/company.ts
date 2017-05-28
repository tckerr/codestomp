import {BaseBusinessUnit} from './business-units/base-business-unit';
import {BusinessUnitClassResolver} from './business-units/business-unit-class-resolver';
import {CompanyResourceBank} from './resources/company-resource-bank';
import {Unlocks} from './unlocks';

export class Company {
   public businessUnits: BaseBusinessUnit[] = [];
   public name: string;
   public resources: CompanyResourceBank;
   public unlocks: Unlocks;

   constructor(json: any) {
      for (let unit of json.businessUnits) {
         let businessUnit = this.buildBusinessUnit(unit);
         this.businessUnits.push(businessUnit);
      }
      this.name = json.name;
      this.resources = new CompanyResourceBank(json.resources);
      this.unlocks = new Unlocks(json.unlocks);
   }

   private buildBusinessUnit(unit): BaseBusinessUnit {
      let businessUnitClass = BusinessUnitClassResolver.resolve(unit.id);
      return new businessUnitClass(unit);
   }
}
