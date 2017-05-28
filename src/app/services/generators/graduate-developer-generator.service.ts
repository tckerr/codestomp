import {Injectable} from '@angular/core';
import {TickService} from '../tick/tick.service';
import {Subject} from 'rxjs/Subject';
import {Developer} from '../../models/developer';
import {IdGeneratorService} from '../id-generator.service';
import {ConfigurationService} from '../configuration.service';
import {GameStorageService} from '../game-storage.service';

@Injectable()
export class GraduateDeveloperGeneratorService {
   private source = new Subject<Developer>();
   public pipeline = this.source.asObservable();

   constructor(private tickService: TickService,
               private config: ConfigurationService,
               private gameStorageService: GameStorageService,
               private idGenerator: IdGeneratorService) {
   }

   public start() {
      this.tickService.pipeline.subscribe(
         tick => this.generateStudentIfNeeded(tick.msElapsed)
      )
   }

   private generateStudentIfNeeded(ms: number) {
      this.gameStorageService.game.marketResources.graduateDevelopers.add(ms);
      let balance = this.gameStorageService.game.marketResources.graduateDevelopers.balance;
      let interval = this.config.newGraduatesIntervalMs;
      if (balance > interval) {
         this.gameStorageService.game.marketResources.graduateDevelopers.balance -= interval;
         let developer = new Developer({
            id: this.idGenerator.generate(),
            firstName: 'Tom',
            lastName: 'Kerr'
         });
         this.source.next(developer)
      }
   }
}
