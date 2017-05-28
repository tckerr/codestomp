import {Component, OnInit} from '@angular/core';
import {GameStorageService} from '../../../services/game-storage.service';

@Component({
   selector: 'app-management',
   templateUrl: './management.component.html',
   styleUrls: ['./management.component.less']
})
export class ManagementComponent implements OnInit {

   constructor(private gameStorageService: GameStorageService) {
   }

   ngOnInit() {
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
