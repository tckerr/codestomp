import {CompanyResourceBank} from './company-resource-bank';
import {Unlocks} from './unlocks';
import {BusinessUnitCollection} from './business-unit-collection';

export class Company {
   public businessUnits: BusinessUnitCollection;
   public name: string;
   public resources: CompanyResourceBank;
   public unlocks: Unlocks;

   constructor(json: any) {
      this.businessUnits = new BusinessUnitCollection(json.businessUnits);
      this.name = json.name;
      this.resources = new CompanyResourceBank(json.resources);
      this.unlocks = new Unlocks(json.unlocks);
   }
}
