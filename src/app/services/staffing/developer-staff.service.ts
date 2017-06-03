import {Injectable} from '@angular/core';
import * as Enumerable from 'linq';
import {GameStorageService} from '../persistence/game-storage.service';

@Injectable()
export class DeveloperStaffService {

   // TODO: remove this class? kinda useless
   constructor(private gameStorageService: GameStorageService,) {
   }

   private get devBusinessUnit() {
      return this.gameStorageService.game.company.businessUnits.development;
   }

   public get staff() {
      return Enumerable
         .from(this.devBusinessUnit.staff)
         .orderBy(n => n.experience)
         .toArray();
   }
}
