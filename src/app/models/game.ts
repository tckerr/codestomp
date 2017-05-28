import {Company} from './company';

export class Game {
   public id: string;
   public tick: number;
   public time: string;
   public company: Company;

   constructor(json: any) {
      this.id = json.id;
      this.tick = json.tick;
      this.time = json.time;
      this.company = new Company(json.company);
   }
}
