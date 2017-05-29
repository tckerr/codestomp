import {Injectable, OnDestroy} from '@angular/core';
import {Subscription} from 'rxjs/Subscription';
import {DeveloperStaffService} from '../resource-services/developer-staff.service';
import {TickService} from '../tick/tick.service';
import {Tick} from '../../models/tick';
import {FundService} from '../resource-services/fund.service';
import {Staff} from '../../models/business-units/staff';

@Injectable()
export class StaffSalaryAccumulatorService implements OnDestroy {

  private sub: Subscription;

   constructor(private developerStaff: DeveloperStaffService,
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
      let total = 0;
      let staff = this.developerStaff.staff;
      staff.forEach((s) => total += this.getSalary(s, ms));
      return total;
   }

   private getSalary(staff: Staff, ms: number) : number {
      // TODO: modifiers
      return staff.hired * staff.baseSalaryPerMs * ms;
   }
}
