import {Injectable} from '@angular/core';
import {TickService} from '../tick/tick.service';
import {DeveloperHiringPoolService} from '../hiring-pools/developer-hiring-pool.service';

@Injectable()
export class GraduateDeveloperGeneratorService {

   private timeSinceLastGenerated: number = 0;

   constructor(private tickService: TickService,
               private hiringPool: DeveloperHiringPoolService) {
   }


   public start() {
      this.tickService.pipeline.subscribe(
         tick => this.generateStudentIfNeeded(tick.msElapsed)
      )
   }

   private generateStudentIfNeeded(ms: number) {
      if (this.hiringPool.pool.length > 4)
         return


   }
}
