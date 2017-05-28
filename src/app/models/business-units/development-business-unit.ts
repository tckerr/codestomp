import {IBusinessUnit} from './ibusiness-unit';
import {Developer} from '../developer';

export class DevelopmentBusinessUnit implements IBusinessUnit {
   public spacesVsTabs: string;
   public name: string;
   public id: string;
   public active: boolean;
   public staff: Developer[] = [];

   constructor(json: any) {
      this.name = json.name;
      this.id = json.id;
      this.active = json.active;
      this.spacesVsTabs = json.spacesVsTabs;
      for (let i = 0; i < json.developers.length; i++) {
         this.staff.push(new Developer(json.developers[i]))
      }
   }
}
