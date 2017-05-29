import {Injectable} from '@angular/core';
import {Staff} from '../../../../models/business-units/staff';
import {Tick} from '../../../../models/tick';
import {DeveloperStaffService} from '../../../resource-services/developer-staff.service';
import {CodeService} from '../../../resource-services/code.service';
import {TickExecutor} from '../../../interfaces/tick-executor';

@Injectable()
export class CodeWritingService implements TickExecutor {

   constructor(private codeService: CodeService,
               private developerStaff: DeveloperStaffService,) {
   }

   public execute(tick: Tick) {
      let growth = this.codeWrittenForMs(tick.msElapsed);
      if (growth != 0)
         this.codeService.write(growth);
   }

   private codeWrittenForMs(ms: number) {
      let total = 0;
      this.developerStaff.staff.forEach(s => total += this.codeWrittenByStaffType(ms, s));
      return total;
   }

   private codeWrittenByStaffType(ms: number, staff: Staff): number {
      // TODO: concrete type for typeDetails
      // TODO: modifiers
      return ms * staff.hired * staff.typeDetails.codePerMs;
   }

}
