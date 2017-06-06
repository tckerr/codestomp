import {Injectable} from '@angular/core';
import {Staff} from '../../../../../../models/game/company/business-units/staff';
import {Tick} from '../../../../../../models/tick/tick';
import {DeveloperStaffService} from '../../../../../staffing/developer-staff.service';
import {CodeService} from '../../../../../resource-services/code.service';
import {TickExecutor} from '../../../tick-executor';

@Injectable()
export class CodeWritingService implements TickExecutor {

   constructor(private codeService: CodeService,
               private developerStaff: DeveloperStaffService,) {
   }

   public execute(tick: Tick) {
      let growth = this.codeWrittenForMs(tick.weightedMs);
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
