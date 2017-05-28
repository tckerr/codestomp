import {Company} from './company';
import {MarketResourceBank} from './resources/market-resource-bank';

export class Game {
   public id: string;
   public tick: number;
   public time: string;
   public company: Company;
   public marketResources: MarketResourceBank;

   constructor(json: any) {
      this.id = json.id;
      this.tick = json.tick;
      this.time = json.time;
      this.company = new Company(json.company);
      this.marketResources = new MarketResourceBank(json.marketResources);
   }
}
