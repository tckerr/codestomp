import {Component, Input, OnInit} from '@angular/core';
import {TalentGeneratorService} from '../../../../../services/generators/talent-generator-service';

@Component({
   selector: 'app-talent-capacity-breakdown',
   templateUrl: './talent-capacity-breakdown.component.html',
   styleUrls: ['./talent-capacity-breakdown.component.css']
})
export class TalentCapacityBreakdownComponent implements OnInit {

   @Input() hoveredCost: number = 0;

   constructor(private talentGeneratorService: TalentGeneratorService) {
   }

   ngOnInit() {}

   public get effectiveAvailable() {
      let effectiveAvailable = this.hoveredCost ? this.available - this.hoveredCost : this.available;
      let availablePct = effectiveAvailable / this.max;
      return availablePct;
   }

   private get available() {
      return  Math.floor(this.talentGeneratorService.totalTalent);
   }

   private get max() {
      return this.talentGeneratorService.talentCap;
   }

   public get availablePct() {
      return `${this.effectiveAvailable * 100}%`;
   }

   public get costPct() {
      let pct = this.hoveredCost/this.max;
      return `${pct * 100}%`;
   }

}
