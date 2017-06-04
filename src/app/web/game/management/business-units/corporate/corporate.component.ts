import {Component, OnInit} from '@angular/core';
import {GameStorageService} from '../../../../../persistence/game-storage.service';
import * as Enumerable from 'linq';
import {IBusinessUnit} from '../../../../../models/game/company/business-units/ibusiness-unit';
import {FundService} from '../../../../../game/resource-services/fund.service';
import {BusinessUnitUnlockListenerService} from '../../../../../game/listeners/business-unit-unlock-listener.service';
import {BusinessUnitService} from '../../../../../game/business-units/business-unit.service';
import {BusinessUnitUnlockerService} from '../../../../../game/business-units/business-unit-unlocker.service';

class UnitGroup {
   constructor(public index, public items) {
   }
}

@Component({
   selector: 'app-corporate',
   templateUrl: './corporate.component.html',
   styleUrls: ['./corporate.component.css']
})
export class CorporateComponent implements OnInit {

   constructor(
      private gameStorageService: GameStorageService,
      private businessUnitUnlockerService: BusinessUnitUnlockerService
   ) {
   }

   ngOnInit() {}

   private get unitGroups(): UnitGroup[] {
      let index = 0;
      return Enumerable
         .from(this.gameStorageService.game.company.businessUnits.$asList())
         .where(u => u.id !== 'corporate')
         .buffer(3)
         .select(g => new UnitGroup(index++, g))
         .toArray();
   }

   private getIndex(g: UnitGroup) {
      return g.index;
   }

   private unitFor(id: string) {
      return this.gameStorageService.game.company.businessUnits[id];
   }

   private costFor(unit: IBusinessUnit) {
      return this.businessUnitUnlockerService.costFor(unit.id);
   }

   private canAfford(unit: IBusinessUnit) {
      return this.businessUnitUnlockerService.canAfford(unit.id);
   }

   private purchase(unit: IBusinessUnit) {
      this.businessUnitUnlockerService.purchase(unit.id);
   }
}
