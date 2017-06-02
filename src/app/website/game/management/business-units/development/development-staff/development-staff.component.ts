import {Component, OnInit} from '@angular/core';
import {DeveloperStaffService} from '../../../../../../services/resource-services/developer-staff.service';
import {Staff} from '../../../../../../models/business-units/staff';
import * as Enumerable from 'linq';
import {UnlocksService} from '../../../../../../services/unlocks.service';
import {StaffType} from '../../../../../../models/definitions/staff-definitions';
import {HiringService} from '../../../../../../services/hiring.service';

@Component({
   selector: 'app-development-staff',
   templateUrl: './development-staff.component.html',
   styleUrls: ['./development-staff.component.css']
})
export class DevelopmentStaffComponent implements OnInit {

   constructor(private developerStaffService: DeveloperStaffService,
               private hiringService: HiringService,
               private unlocksService: UnlocksService,) {
   }

   ngOnInit() {
   }

   public get devStaff(): Staff[] {
      return Enumerable
         .from(this.developerStaffService.staff)
         .where(s => this.unlocksService.staffAtExperienceIsUnlocked(s.experience, "development"))
         .toArray();
   }

   // TODO: use a more reliable id
   public fire(id: StaffType) {
      this.hiringService.fire(id);
   }

}
