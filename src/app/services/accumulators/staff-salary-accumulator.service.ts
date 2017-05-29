import {Injectable, OnDestroy} from '@angular/core';
import {Subscription} from 'rxjs/Subscription';
import {ConfigurationService} from '../configuration.service';
import {DeveloperStaffService} from '../resource-services/developer-staff.service';
import {TickService} from '../tick/tick.service';
import {Tick} from '../../models/tick';
import {FundService} from '../resource-services/fund.service';

@Injectable()
export class StaffSalaryAccumulatorService implements OnDestroy {

  private sub: Subscription;

   constructor(private config: ConfigurationService,
               private developerStaff: DeveloperStaffService,
               private fundService: FundService,
               private tickService: TickService) {
   }

   ngOnDestroy(): void {
      this.sub && this.sub.unsubscribe();
   }

   public start() {
      this.sub = this.tickService.pipeline.subscribe((tick: Tick) => {
         let costs = this.salaryCostsPerMs(tick.msElapsed);
         let surplus = this.fundService.funds.remove(costs);
         if (surplus < 0)
            this.developerStaff.chanceRandomQuit(tick.msElapsed);
      });
   }

   public get costsPerHour(){
      return this.salaryCostsPerMs(1000 * 60 * 60);
   }

   private salaryCostsPerMs(ms: number) {
      return this.salaryForAssociateDevs(ms) +
         this.salaryForJuniorDevs(ms) +
         this.salaryForSeniorDevs(ms) +
         this.salaryForQaAnalyst(ms) +
         this.salaryForSeniorQaAnalyst(ms) +
         this.salaryForQaAutomationEngineer(ms);
   }

   private salaryForAssociateDevs(ms: number) {
      let people = this.developerStaff.staff.associateDeveloper;
      let costPerPerson = this.config.associateDeveloperSalary * ms;
      return people * costPerPerson;
   }

   private salaryForJuniorDevs(ms: number) {
      let people = this.developerStaff.staff.juniorDeveloper;
      let costPerPerson = this.config.juniorDeveloperSalary * ms;
      return people * costPerPerson;
   }

   private salaryForSeniorDevs(ms: number) {
      let people = this.developerStaff.staff.seniorDeveloper;
      let costPerPerson = this.config.seniorDeveloperSalary * ms;
      return people * costPerPerson;
   }

   private salaryForQaAnalyst(ms: number) {
      let people = this.developerStaff.staff.qaAnalyst;
      let costPerPerson = this.config.associateQaAnalystSalary * ms;
      return people * costPerPerson;
   }

   private salaryForSeniorQaAnalyst(ms: number) {
      let people = this.developerStaff.staff.seniorQaAnalyst;
      let costPerPerson = this.config.seniorQaAnalystSalary * ms;
      return people * costPerPerson;
   }

   private salaryForQaAutomationEngineer(ms: number) {
      let people = this.developerStaff.staff.qaAutomationEngineer;
      let costPerPerson = this.config.qaAutomationEngineerSalary * ms;
      return people * costPerPerson;
   }
}
