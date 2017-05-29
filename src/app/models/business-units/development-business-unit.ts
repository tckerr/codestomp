import {IBusinessUnit} from './ibusiness-unit';

export class DevelopmentBusinessUnit implements IBusinessUnit {
   public spacesVsTabs: string;
   public name: string;
   public id: string;
   public active: boolean;
   public staff: {
      associateDeveloper: number,
      juniorDeveloper: number,
      seniorDeveloper: number,
      qaAnalyst: number,
      seniorQaAnalyst: number,
      qaAutomationEngineer: number
   };

   constructor(json: any) {
      this.name = json.name;
      this.id = json.id;
      this.active = json.active;
      this.spacesVsTabs = json.spacesVsTabs;
      this.staff = json.staff;
   }

   public get $totalStaff() {
      return this.staff.associateDeveloper +
         this.staff.juniorDeveloper +
         this.staff.seniorDeveloper +
         this.staff.qaAnalyst +
         this.staff.seniorQaAnalyst +
         this.staff.qaAutomationEngineer;
   }
}
