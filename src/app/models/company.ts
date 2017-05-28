import {BaseBusinessUnit} from "./business-units/base-business-unit";
import {BusinessUnitClassResolver} from './business-units/business-unit-class-resolver';
import {ResourceBank} from './resource-bank';
import {Unlocks} from './unlocks';

export class Company {
   public businessUnits: BaseBusinessUnit[] = [];
   public name: string;
   public resources: ResourceBank;
   public unlocks: Unlocks;

   constructor(json: any){
      for (let unit of json.businessUnits){
         let businessUnit = this.buildBusinessUnit(unit);
         this.businessUnits.push(businessUnit);
      }
      this.name = json.name;
      this.resources = new ResourceBank(json.resources);
      this.unlocks = new Unlocks(json.unlocks);
   }

   private buildBusinessUnit(unit) : BaseBusinessUnit {
      let businessUnitClass = BusinessUnitClassResolver.resolve(unit.id);
      return new businessUnitClass(unit);
   }
}
