import {IStaff} from './istaff';

export class Staff implements IStaff{
   public displayName: string;
   public type: string;
   public experience: string;
   public special: string;
   public baseSalaryPerMs: number;
   public hired: number;
   public typeDetails: any;

   constructor(json: any){
      this.displayName = json.displayName;
      this.type = json.type;
      this.experience = json.experience;
      this.special = json.special;
      this.baseSalaryPerMs = json.baseSalaryPerMs;
      this.hired = json.hired;
      this.typeDetails = json.typeDetails;
   }
}
