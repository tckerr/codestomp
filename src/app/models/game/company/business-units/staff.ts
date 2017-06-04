import {IStaff} from './istaff';

export class Staff implements IStaff {

   public id: number;
   public displayName: string;
   public category: string;
   public experience: number;
   public special: string;
   public baseSalaryPerMs: number;
   public hired: number;
   public typeDetails: any;

   constructor(json: any) {
      this.id = json.id;
      this.displayName = json.displayName;
      this.category = json.category;
      this.experience = json.experience;
      this.special = json.special;
      this.baseSalaryPerMs = json.baseSalaryPerMs;
      this.hired = json.hired;
      this.typeDetails = json.typeDetails;
   }
}
