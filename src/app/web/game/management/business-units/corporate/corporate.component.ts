import {Component, OnInit} from '@angular/core';
import {GameStorageService} from '../../../../../persistence/game-storage.service';
import * as Enumerable from 'linq';
import {IBusinessUnit} from '../../../../../models/game/company/business-units/ibusiness-unit';
import {FundService} from '../../../../../game/resource-services/fund.service';

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
      private fundService: FundService,
   ) {
   }

   ngOnInit() {
   }

   private get unitGroups(): UnitGroup[] {
      let index = 0;
      return Enumerable
         .from(this.gameStorageService.game.company.businessUnits.$asList())
         .where(u => u.id !== 'corporate')
         .buffer(3)
         .select(g => new UnitGroup(index++, g))
         .toArray();
   }

   private unitFor(id: string) {
      return this.gameStorageService.game.company.businessUnits[id];
   }

   private getIndex(g: UnitGroup) {
      return g.index;
   }

   private costFor(unit: IBusinessUnit) {
      return 1000;
   }

   private canAfford(unit: IBusinessUnit) {
      let cost = this.costFor(unit);
      return this.fundService.funds.balance >= cost;
   }

}
