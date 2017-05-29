import {Injectable} from '@angular/core';
import {Tick} from '../../../../models/tick';
import {Staff} from '../../../../models/business-units/staff';
import {DeveloperStaffService} from '../../../resource-services/developer-staff.service';
import {CodeService} from '../../../resource-services/code.service';
import {TickExecutor} from '../../../interfaces/tick-executor';

@Injectable()
export class CodeTestingService implements TickExecutor {

   constructor(private codeService: CodeService,
               private developerStaff: DeveloperStaffService,) {
   }

   public execute(tick: Tick) {
      let growth = this.codeTestedForMs(tick.msElapsed);
      if (growth > 0)
         this.codeService.test(growth);
   }

   private codeTestedForMs(ms: number) {
      let total = 0;
      this.developerStaff.staff.forEach(s => total += this.codeTestedByStaffType(ms, s));
      return total;
   }

   private codeTestedByStaffType(ms: number, staff: Staff): number {
      // TODO: concrete type for typeDetails
      // TODO: modifiers
      return ms * staff.hired * staff.typeDetails.testingPerMs;
   }

}
