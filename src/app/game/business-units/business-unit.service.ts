import {Injectable} from '@angular/core';
import {GameStorageService} from '../../persistence/game-storage.service';
import * as Enumerable from 'linq';

@Injectable()
export class BusinessUnitService {

   constructor(private gameStorageService: GameStorageService,) {
   }

   public get units() {
      return this.gameStorageService.game.company.businessUnits.$asList();
   }

   public getUnit(id: string) {
      return this.gameStorageService.game.company.businessUnits[id];
   }

   public get totalUnlocked(): number {
      return Enumerable
         .from(this.units)
         .where(u => u.active)
         .count();
   }

}
