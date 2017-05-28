import {Injectable} from '@angular/core';
import {GameStorageService} from '../game-storage.service';
import {LoggerService} from '../logger-service';

@Injectable()
export class CustomerService {

   constructor(private gameStorageService: GameStorageService,
               private logger: LoggerService) {
   }

   public get customers() {
      return this.gameStorageService.game.company.resources.customers;
   }

   public add(count: number = 1): void {
     //this.logger.gameLog(`Attracted ${count} customers`);
     this.gameStorageService.game.company.resources.customers.add(count);
  }

}
