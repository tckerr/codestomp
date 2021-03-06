import {Component, Input, OnInit} from '@angular/core';
import {Staff} from '../../../../../models/game/company/business-units/staff';
import * as Enumerable from 'linq';
import {UnlocksService} from '../../../../../game/achievements/unlocks.service';
import {StaffType} from '../../../../../models/definitions/staff-definitions';
import {HiringService} from '../../../../../game/staffing/hiring.service';
import {GameStorageService} from '../../../../../persistence/game-storage.service';

@Component({
   selector: 'app-staff-summary',
   templateUrl: './staff-summary.component.html',
   styleUrls: ['./staff-summary.component.css']
})
export class StaffSummaryComponent implements OnInit {

   // TODO: inject
   @Input() businessUnitId: string;

   constructor(private gameStorageService: GameStorageService,
               private hiringService: HiringService,
               private unlocksService: UnlocksService) {
   }

   ngOnInit() {
   }

   public get allStaff(): Staff[] {
      return Enumerable
         .from(this.gameStorageService.game.company.businessUnits.$asList())
         .where(bu => bu.id === this.businessUnitId)
         .selectMany(bu => bu.staff)
         .orderBy(staff => staff.experience)
         .where(s => this.unlocksService.staffAtExperienceIsUnlocked(s.experience, this.businessUnitId))
         .toArray();
   }

   public fire(id: StaffType) {
      this.hiringService.fire(id);
   }

}
