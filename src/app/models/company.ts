import {BusinessUnit} from "./business-unit";

export class Company {
   public businessUnits: BusinessUnit[];
   public name: string;

   constructor(json: any){
      this.businessUnits = json.businessUnits || [];
      this.name = json.name;
   }
}
