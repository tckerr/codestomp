import {Component, OnInit} from '@angular/core';
import {DeveloperStaffService} from '../../../../../../services/resource-services/developer-staff.service';
import {Staff} from '../../../../../../models/business-units/staff';
import * as Enumerable from 'linq';
import {UnlocksService} from '../../../../../../services/unlocks.service';

@Component({
   selector: 'app-development-staff',
   templateUrl: './development-staff.component.html',
   styleUrls: ['./development-staff.component.css']
})
export class DevelopmentStaffComponent implements OnInit {

   constructor(private developerStaffService: DeveloperStaffService,
               private unlocksService: UnlocksService,) {
   }

   ngOnInit() {
   }

   public get devStaff(): Staff[] {
      return Enumerable
         .from(this.developerStaffService.staff)
         .where(s => this.unlocksService.devStaffAtExperienceIsUnlocked(s.experience))
         .toArray();
   }

   public fire(displayName: string) {
      this.developerStaffService.fire(displayName);
   }

}
