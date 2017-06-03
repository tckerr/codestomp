import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {perHour, perYear} from '../../../../../environments/environment';
import {StaffCategory} from '../../../../models/definitions/staff-definitions';
import {UnlocksService} from '../../../../services/unlocks.service';
import * as Enumerable from 'linq';
import {TalentService} from '../../../../services/resource-services/talent.service';
import {Staff} from 'app/models/business-units/staff';
import {HiringService} from '../../../../services/hiring.service';
import {GameStorageService} from '../../../../services/game-storage.service';
import {StaffCategoryIconResolverService} from '../../../../services/staff-category-icon-resolver.service';


@Component({
   selector: 'app-job-market',
   templateUrl: './job-market.component.html',
   styleUrls: ['./job-market.component.css']
})
export class JobMarketComponent implements OnChanges, OnInit {

   @Input() businessUnitId: string;
   public activeHireType: string;
   private hireTypes: any[] = [];
   private activeTalentCost: number = 0;

   constructor(private talentService: TalentService,
               private gameStorageService: GameStorageService,
               private hiringService: HiringService,
               private iconResolver: StaffCategoryIconResolverService,
               private unlocksService: UnlocksService,) {

   }

   ngOnInit(): void {
      this.buildHireTypes();
   }

   ngOnChanges(changes: SimpleChanges): void {
      this.businessUnitId = changes['businessUnitId'].currentValue || this.businessUnitId;
      this.buildHireTypes();
   }

   private buildHireTypes() {
      let self = this;
      debugger;
      this.hireTypes = Enumerable
         .from(this.gameStorageService.game.company.businessUnits.$asList())
         .where(bu => bu.id === this.businessUnitId)
         .selectMany(bu => bu.staff)
         .orderBy(staff => staff.experience)
         .select((staff: Staff) => {
            return {
               id: staff.id,
               category: staff.category,
               displayName: staff.displayName,
               special: staff.special,
               typeDetails: this.buildTypeDetails(staff),
               salary: staff.baseSalaryPerMs * perYear,
               salaryPerHour: staff.baseSalaryPerMs * perHour,
               talentCost: this.talentService.getCostForExperience(staff.experience),
               hire: (count) => this.hiringService.hire(staff.id, staff.experience, count),
               hireAll: () => this.hiringService.hire(staff.id, staff.experience, this.talentService.maxHires(staff.experience)),
               unlocked: () => this.unlocksService.staffAtExperienceIsUnlocked(staff.experience, self.businessUnitId),
               getPreviewName: () => this.getPreviewName(staff),
               count: () => this.talentService.maxHires(staff.experience)
            };
         })
         .toArray();
   }

   // TODO: extract to class
   private buildTypeDetails(staff) {
      switch (this.businessUnitId) {
         case 'development':
            return [
               {
                  displayName: 'Coding',
                  value: Math.floor(100 * staff.typeDetails.codePerMs * perHour) / 100 + '/hr'
               },
               {
                  displayName: 'Testing',
                  value: Math.floor(100 * staff.typeDetails.testingPerMs * perHour) / 100 + '/hr'
               },
               {
                  displayName: 'Bug Fixes',
                  value: Math.floor(100 * staff.typeDetails.bugFixesPerMs * perHour) / 100 + '/hr'
               }
            ]
      }
   }

   // TODO: extract to class
   private getStaffCategoryIcon(category: StaffCategory) {
      return this.iconResolver.resolve(category);
   }

   private get activeBusinessUnit() {
      return this.gameStorageService.game.company.businessUnits[this.businessUnitId];
   }

   private getPreviewName(staff) {
      let hiring = this.unlocksService.unlocks.hiring[this.businessUnitId];
      const preview = hiring === this.unlocksService.experienceTypeToUnlockTier(staff.experience) - 1;
      return preview ? staff.displayName : '???';
   }

   public resetCost() {
      this.activeTalentCost = 0;
      return true;
   }
}
