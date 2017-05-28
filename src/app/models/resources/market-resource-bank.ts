import {HiringCandidatePoolResource} from './hiring-candidate-pool-resource';

export class MarketResourceBank {
   public graduateDevelopers: HiringCandidatePoolResource;

   constructor(json: any) {
      this.graduateDevelopers = new HiringCandidatePoolResource(json.graduateDevelopers);
   }
}
