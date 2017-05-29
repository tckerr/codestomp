import {Injectable} from '@angular/core';
import {TickService} from '../tick/tick.service';
import {Subject} from 'rxjs/Subject';
import {Developer} from '../../models/developer';
import {IdGeneratorService} from '../id-generator.service';
import {ConfigurationService} from '../configuration.service';
import {GameStorageService} from '../game-storage.service';

@Injectable()
export class GraduateDeveloperGeneratorService {

   constructor(private tickService: TickService,
               private config: ConfigurationService,
               private gameStorageService: GameStorageService) {
   }

   public start() {
      this.tickService.pipeline.subscribe(
         tick => this.gameStorageService.game.marketResources.graduateDevelopers.add(tick.msElapsed)
      )
   }

   public get available() {
      let balance = this.gameStorageService.game.marketResources.graduateDevelopers.balance;
      let interval = this.config.newGraduatesIntervalMs;
      return Math.floor(balance/interval);
   }

   public hire(){
      let balance = this.gameStorageService.game.marketResources.graduateDevelopers.balance;
      if(this.config.newGraduatesIntervalMs <= balance)
         this.gameStorageService.game.marketResources.graduateDevelopers.balance -= this.config.newGraduatesIntervalMs;
      else
         throw Error("Cannot hire, no one available!");
   }

}
