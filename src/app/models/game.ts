import {Company} from './game/company/company';
import {MarketResourceBank} from './game/market-resource-bank';
import {AchievementTrack} from './achievements/achievement-track';

export class Game {
   public id: string;
   public tick: number;
   public time: string;
   public company: Company;
   public achievementTracks: AchievementTrack[] = [];
   public marketResources: MarketResourceBank;

   constructor(json: any) {
      this.id = json.id;
      this.tick = json.tick;
      this.time = json.time;
      this.company = new Company(json.company);
      this.marketResources = new MarketResourceBank(json.marketResources);
      json.achievementTracks.forEach(t => this.achievementTracks.push(new AchievementTrack(t)));
   }
}
