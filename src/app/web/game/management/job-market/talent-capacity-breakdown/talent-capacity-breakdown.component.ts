import {Component, Input, OnInit} from '@angular/core';
import {TalentService} from "../../../../../game/resource-services/talent.service";

@Component({
   selector: 'app-talent-capacity-breakdown',
   templateUrl: './talent-capacity-breakdown.component.html',
   styleUrls: ['./talent-capacity-breakdown.component.css']
})
export class TalentCapacityBreakdownComponent implements OnInit {

   @Input() hoveredCost: number = 0;

   constructor(private talentService: TalentService) {
   }

   ngOnInit() {}

   public get effectiveAvailablePct() {
      return this.effectiveAvailable / this.max;
   }

   private get effectiveAvailable() {
      let effectiveAvailable = !isNaN(this.hoveredCost) ? this.available - this.hoveredCost : this.available;
      return Math.max(0, effectiveAvailable);
   }

   private get available() {
      return  Math.floor(this.talentService.talent.balance);
   }

   private get max() {
      return this.talentService.talentCap;
   }

   public get availablePct() {
      return `${this.effectiveAvailablePct * 100}%`;
   }

   public get costPct() {
      let pct = this.hoveredCost/this.max;
      return `${pct * 100}%`;
   }

}
