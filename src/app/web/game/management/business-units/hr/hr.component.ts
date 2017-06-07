import {Component, OnInit} from '@angular/core';
import {UnlocksService} from '../../../../../game/achievements/unlocks.service';
import {UnlockableFeature} from '../../../../../models/achievements/unlockable-feature.enum';
import {IStateData} from './recruiting-map/map-data-provider.service';

@Component({
   selector: 'app-hr',
   templateUrl: './hr.component.html',
   styleUrls: ['./hr.component.css']
})
export class HRComponent implements OnInit {
   private selectedState: IStateData;
   constructor(private unlocksService: UnlocksService,
   ) {
   }

   ngOnInit(): void {
   }

   public hiringUnlocked() {
      return this.unlocksService.isUnlocked(UnlockableFeature.HrHiringTier1);
   }

   public stateSelected($state: IStateData){
      this.selectedState = $state;
   }


}
