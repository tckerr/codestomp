import {Component, OnInit} from '@angular/core';
import {DeveloperHiringPoolService} from '../../../../services/hiring-pools/developer-hiring-pool.service';
import {perHour, perYear} from '../../../../../environments/environment';
import {DeveloperStaffService} from '../../../../services/resource-services/developer-staff.service';


@Component({
   selector: 'app-development-hiring',
   templateUrl: './development-hiring.component.html',
   styleUrls: ['./development-hiring.component.css']
})
export class DevelopmentHiringComponent implements OnInit {

   public activeHireType: string;
   private devHireTypes: any[] = [];
   private activeTalentCost: number = 0;

   constructor(private developerPool: DeveloperHiringPoolService,
               private developerStaffService: DeveloperStaffService,
   ) {
      this.buildHireTypes();
   }

   private buildHireTypes() {
      this.developerStaffService.staff.forEach(staff => this.devHireTypes.push({
            id: staff.displayName,
            displayName: staff.displayName,
            special: staff.special,
            cph: staff.typeDetails.codePerMs * perHour,
            salary: staff.baseSalaryPerMs * perYear,
            salaryPerHour: staff.baseSalaryPerMs * perHour,
            talentCost: this.developerPool.getCostForExperience(staff.experience),
            qaph: staff.typeDetails.testingPerMs * perHour,
            hire: () => this.developerPool.hire(staff.displayName, staff.experience),
            unlocked: true,
            count: () => this.developerPool.maxHires(staff.experience)
         })
      );
   }

   public resetCost() {
      this.activeTalentCost = 0;
      return true;
   }

   ngOnInit() {}
}
