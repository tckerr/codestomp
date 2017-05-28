import {Component, OnInit} from '@angular/core';
import {GameStorageService} from '../../../services/game-storage.service';
import {UnlocksService} from '../../../services/unlocks.service';

@Component({
   selector: 'app-management',
   templateUrl: './management.component.html',
   styleUrls: ['./management.component.less']
})
export class ManagementComponent implements OnInit {

   constructor(
      private gameStorageService: GameStorageService,
      private unlocksService: UnlocksService) {
   }

   ngOnInit() {
   }

   public get hiringUnlocked(){
      return this.unlocksService.unlocks.devHiring > 0;
   }

   private get company() {
      return this.gameStorageService.game.company;
   }

   private get activeBusinessUnits() {
      let results = [];
      this.company.businessUnits.forEach(u => {
         if (u.active)
            results.push(u);
      });
      return results;
   }

}
