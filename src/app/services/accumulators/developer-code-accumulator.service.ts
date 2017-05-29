import {Injectable, OnDestroy} from '@angular/core';
import {CodeService} from '../resource-services/code.service';
import {ConfigurationService} from '../configuration.service';
import {TickService} from '../tick/tick.service';
import {Tick} from '../../models/tick';
import {Subscription} from 'rxjs/Subscription';
import {DeveloperStaffService} from '../resource-services/developer-staff.service';

@Injectable()
export class DeveloperCodeAccumulatorService implements OnDestroy {
   private sub: Subscription;

   constructor(private codeService: CodeService,
               private config: ConfigurationService,
               private developerStaff: DeveloperStaffService,
               private tickService: TickService) {
   }

   ngOnDestroy(): void {
      this.sub && this.sub.unsubscribe();
   }

   public start() {
      this.sub = this.tickService.pipeline.subscribe((tick: Tick) => {
         let growth = this.codeWrittenForMs(tick.msElapsed);
         if (growth > 0)
            this.codeService.write(growth);
      })
   }

   private codeWrittenForMs(ms: number) {
      return this.associatesCode(ms) + this.juniorCode(ms) + this.seniorCode(ms);
   }

   private associatesCode(ms: number) {
      let developers = this.developerStaff.staff.associateDeveloper;
      let codePerDeveloper = this.config.associateDeveloperCodeGrowthRate * ms;
      return developers * codePerDeveloper;
   }

   private juniorCode(ms: number) {
      let developers = this.developerStaff.staff.juniorDeveloper;
      let codePerDeveloper = this.config.juniorDeveloperCodeGrowthRate * ms;
      return developers * codePerDeveloper;
   }

   private seniorCode(ms: number) {
      let developers = this.developerStaff.staff.seniorDeveloper;
      let codePerDeveloper = this.config.seniorDeveloperCodeGrowthRate * ms;
      return developers * codePerDeveloper;
   }
}
