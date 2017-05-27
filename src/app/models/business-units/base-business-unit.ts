import {IBusinessUnit} from './ibusiness-unit';

export class BaseBusinessUnit implements IBusinessUnit {
   public name: string;
   public id: string;
   public active: boolean;

   constructor(json: any){
      this.name = json.name;
      this.id = json.id;
      this.active = json.active;
   }
}
