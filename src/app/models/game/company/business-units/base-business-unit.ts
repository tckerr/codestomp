import {IBusinessUnit} from './ibusiness-unit';
import {Staff} from './staff';

export class BaseBusinessUnit implements IBusinessUnit {
   public staff: Staff[] = [];
   public name: string;
   public icon: string;
   public id: string;
   public active: boolean;

   constructor(json: any) {
      this.name = json.name;
      this.id = json.id;
      this.active = json.active;
      for (let staff of json.staff) {
         this.staff.push(new Staff(staff));
      }
      this.icon = json.icon || 'fa-building';
   }
}
