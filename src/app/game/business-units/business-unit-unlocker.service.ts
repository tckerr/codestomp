import {Injectable} from '@angular/core';
import {AchievementTrackUnlockerService} from '../achievements/achievement-track-unlocker.service';
import {FundService} from '../resource-services/fund.service';
import {BusinessUnitService} from './business-unit.service';

@Injectable()
export class BusinessUnitUnlockerService {

   constructor(private fundService: FundService,
               private businessUnitService: BusinessUnitService,
               private achievementService: AchievementTrackUnlockerService) {
   }

   public costFor(id: string) {
      return 1000;
   }

   public canAfford(id: string) {
      let cost = this.costFor(id);
      return this.fundService.canAfford(cost);
   }

   public purchase(id: string) {
      this.fundService.purchase(this.costFor(id));
      this.unlock(id);
   }

   public unlock(id: string) {
      let unit = this.businessUnitService.getUnit(id);
      unit.active = true;
      // assumes at least one track exists for each BU
      this.achievementService.openTrack(id);
   }
}
