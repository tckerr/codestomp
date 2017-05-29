import {HiringCandidatePoolResource} from './hiring-candidate-pool-resource';

export class MarketResourceBank {
   public talent: HiringCandidatePoolResource;

   constructor(json: any) {
      this.talent = new HiringCandidatePoolResource(json.talent);
   }
}

