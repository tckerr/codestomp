import {Injectable, OnDestroy} from '@angular/core';
import {TickService} from '../../tick/tick.service';
import {Tick} from '../../../models/tick/tick';
import {Subscription} from 'rxjs/Subscription';
import {CodeWritingService} from './development/code-writing.service';
import {TickExecutor} from '../../interfaces/tick-executor';
import {CodeTestingService} from 'app/services/accumulators/staff-actions/development/code-testing.service';
import {CodeDeploymentService} from './development/code-deployment.service';
import {BugFixingService} from './development/bug-fixing.service';
import {IAccumulator} from '../iaccumulator';

@Injectable()
export class StaffActionAccumulatorService implements OnDestroy, IAccumulator {
   private sub: Subscription;
   private executors: TickExecutor[] = [];

   constructor(private codeWritingService: CodeWritingService,
               private codeTestingService: CodeTestingService,
               private codeDeploymentService: CodeDeploymentService,
               private bugFixingService: BugFixingService,
               private tickService: TickService) {
      this.executors = [
         bugFixingService,
         codeTestingService,
         codeDeploymentService,
         codeWritingService,
      ];
   }

   ngOnDestroy(): void {
      this.stop()
   }

   public start() {
      this.sub = this.tickService
         .pipeline
         .subscribe((tick: Tick) => this.executors.forEach(e => e.execute(tick)))
   }

   public stop(){
      this.sub && this.sub.unsubscribe();
   }
}
