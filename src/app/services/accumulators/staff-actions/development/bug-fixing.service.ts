import {Injectable} from '@angular/core';
import {CodeService} from '../../../resource-services/code.service';
import {DeveloperStaffService} from '../../../resource-services/developer-staff.service';
import {Tick} from '../../../../models/tick';
import {TickExecutor} from '../../../interfaces/tick-executor';
import * as Enumerable from 'linq';
import {Staff} from '../../../../models/business-units/staff';

@Injectable()
export class BugFixingService implements TickExecutor {

   constructor(private codeService: CodeService,
               private developerStaff: DeveloperStaffService,) {
   }

   public execute(tick: Tick) {
      let growth = this.bugsFixedForMs(tick.msElapsed);
      if (growth > 0){
         this.codeService.bugFix(growth);
      }
   }

   private bugsFixedForMs(ms: number) {
      return Enumerable
         .from(this.developerStaff.staff)
         .where(s => s.hired > 0)
         .sum(s => this.bugsFixedPerMs(ms, s));
   }

   private bugsFixedPerMs(ms: number, staff: Staff) {
      return ms * staff.hired * staff.typeDetails.bugFixesPerMs;
   }

}
