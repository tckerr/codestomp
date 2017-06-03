import {Injectable} from '@angular/core';
import {LoggerService} from '../logging/logger-service';
import {GameStorageService} from '../persistence/game-storage.service';

@Injectable()
export class FundService {

   constructor(private gameStorageService: GameStorageService,
               private logger: LoggerService) {
   }

   public get funds() {
      return this.gameStorageService.game.company.resources.funds;
   }

   public add(count: number = 1): void {
      if (!count)
         return;
      //this.logger.gameLog(`Added ${count} funds`);
      this.gameStorageService.game.company.resources.funds.add(count);
   }


}
