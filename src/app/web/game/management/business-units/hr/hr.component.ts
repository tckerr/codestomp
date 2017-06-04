import {Component, OnInit} from '@angular/core';
import {UnlocksService} from '../../../../../game/achievements/unlocks.service';
import {UnlockableFeature} from '../../../../../models/achievements/unlockable-feature.enum';

@Component({
   selector: 'app-hr',
   templateUrl: './hr.component.html',
   styleUrls: ['./hr.component.css']
})
export class HRComponent implements OnInit {

   constructor(private unlocksService: UnlocksService) {
   }

   ngOnInit() {
   }

   public hiringUnlocked() {
      return this.unlocksService.isUnlocked(UnlockableFeature.HrHiringTier1);
   }

}
