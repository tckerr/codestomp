import {IBusinessUnit} from './ibusiness-unit';
import {Staff} from './staff';

export class DevelopmentBusinessUnit implements IBusinessUnit {
   public spacesVsTabs: string;
   public name: string;
   public id: string;
   public active: boolean;
   public staff: Staff[] = [];

   constructor(json: any) {
      this.name = json.name;
      this.id = json.id;
      this.active = json.active;
      this.spacesVsTabs = json.spacesVsTabs;
      for (let staff of json.staff) {
         this.staff.push(new Staff(staff));
      }
   }

   public get $totalStaff() {
      let total = 0;
      this.staff.forEach((s) => total += s.hired);
      return total;
   }
}
