import {Component, OnInit} from '@angular/core';
import {perHour, perYear} from '../../../../../environments/environment';
import {DeveloperStaffService} from '../../../../services/resource-services/developer-staff.service';
import {StaffType} from '../../../../models/definitions/staff-definitions';
import {UnlocksService} from '../../../../services/unlocks.service';
import * as Enumerable from 'linq';
import {TalentService} from "../../../../services/resource-services/talent.service";


@Component({
   selector: 'app-development-hiring',
   templateUrl: './development-hiring.component.html',
   styleUrls: ['./development-hiring.component.css']
})
export class DevelopmentHiringComponent implements OnInit {

   public activeHireType: string;
   private devHireTypes: any[] = [];
   private activeTalentCost: number = 0;
   private StaffType = StaffType;

   constructor(private talentService: TalentService,
               private developerStaffService: DeveloperStaffService,
               private unlocksService: UnlocksService,
   ) {
      this.buildHireTypes();
   }

   private buildHireTypes() {
      this.devHireTypes = Enumerable
         .from(this.developerStaffService.staff)
         .select(staff => { return {
               id: staff.displayName,
               type: staff.type,
               displayName: staff.displayName,
               special: staff.special,
               cph: staff.typeDetails.codePerMs * perHour,
               salary: staff.baseSalaryPerMs * perYear,
               salaryPerHour: staff.baseSalaryPerMs * perHour,
               talentCost: this.talentService.getCostForExperience(staff.experience),
               qaph: staff.typeDetails.testingPerMs * perHour,
               hire: () => this.developerStaffService.hire(staff.displayName, staff.experience),
               unlocked: () => this.unlocksService.devStaffAtExperienceIsUnlocked(staff.experience),
               getPreviewName: () => this.getPreviewName(staff),
               count: () => this.talentService.maxHires(staff.experience)}})
         .toArray();
   }

   private getPreviewName(staff) {
      let preview = this.unlocksService.unlocks.devHiring == this.unlocksService.experienceTypeToUnlockTier(staff.experience) - 1;
      return preview ? staff.displayName : "???";
   }

   public resetCost() {
      this.activeTalentCost = 0;
      return true;
   }

   ngOnInit() {}
}
