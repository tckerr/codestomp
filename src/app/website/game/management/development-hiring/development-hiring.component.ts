import {Component, OnInit} from '@angular/core';
import {DeveloperHiringPoolService} from '../../../../services/hiring-pools/developer-hiring-pool.service';
import {ConfigurationService} from '../../../../services/configuration.service';
import {perHour, perYear} from '../../../../../environments/environment';


@Component({
   selector: 'app-development-hiring',
   templateUrl: './development-hiring.component.html',
   styleUrls: ['./development-hiring.component.css']
})
export class DevelopmentHiringComponent implements OnInit {

   private hireMode = false;
   public activeHireType: string;

   private devHireTypes: any;

   constructor(private developerPool: DeveloperHiringPoolService,
               private config: ConfigurationService,) {

      this.devHireTypes = [
         {
            id: "associateDev",
            displayName: "Associate Developer",
            cph: this.config.associateDeveloperCodeGrowthRate * perHour,
            salary: this.config.associateDeveloperSalary * perYear,
            salaryPerHour: this.config.associateDeveloperSalary * perHour,
            qaph: 0,
            hire: () => this.developerPool.addAssociateDev(),
            unlocked: true,
            count: () => this.developerPool.candidates
         },
         {
            id: "juniorDev",
            displayName: "Junior Developer",
            cph: this.config.juniorDeveloperCodeGrowthRate * perHour,
            salary: this.config.juniorDeveloperSalary * perYear,
            salaryPerHour: this.config.juniorDeveloperSalary * perHour,
            qaph: 0,
            hire: () => this.developerPool.addJuniorDev(),
            unlocked: true,
            count: () => this.developerPool.candidates
         },
         {
            id: "seniorDev",
            displayName: "Senior Developer",
            cph: this.config.seniorDeveloperCodeGrowthRate * perHour,
            salary: this.config.seniorDeveloperSalary * perYear,
            salaryPerHour: this.config.seniorDeveloperSalary * perHour,
            qaph: 0,
            hire: () => this.developerPool.addSeniorDev(),
            unlocked: true,
            count: () => this.developerPool.candidates
         },
         {
            id: "qaAnalyst",
            displayName: "QA Analyst",
            cph: this.config.qaAnalystTestRate * perHour,
            salary: this.config.associateQaAnalystSalary * perYear,
            salaryPerHour: this.config.associateQaAnalystSalary * perHour,
            qaph: 0,
            hire: () => {},
            unlocked: true,
            count: () => this.developerPool.candidates
         },
         {
            id: "seniorQaAnalyst",
            displayName: "Senior QA Analyst",
            cph: this.config.seniorQaAnalystTestRate * perHour,
            salary: this.config.seniorQaAnalystSalary * perYear,
            salaryPerHour: this.config.seniorQaAnalystSalary * perHour,
            qaph: 0,
            hire: () => {},
            unlocked: true,
            count: () => this.developerPool.candidates
         },
         {
            id: "qaAutomationEngineer",
            displayName: "QA Automation Engineer",
            cph: this.config.qaAutomationEngineerTestRate * perHour,
            salary: this.config.qaAutomationEngineerSalary * perYear,
            salaryPerHour: this.config.qaAutomationEngineerSalary * perHour,
            qaph: 0,
            hire: () => {},
            unlocked: true,
            count: () => this.developerPool.candidates
         },
      ]
   }

   ngOnInit() {
   }


}
