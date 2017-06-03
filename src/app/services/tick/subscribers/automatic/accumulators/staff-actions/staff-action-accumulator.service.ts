import {Injectable, OnDestroy} from '@angular/core';
import {TickService} from '../../../../tick.service';
import {Tick} from '../../../../../../models/tick/tick';
import {Subscription} from 'rxjs/Subscription';
import {CodeWritingService} from './development/code-writing.service';
import {TickExecutor} from '../../../../tick-executor';
import {CodeDeploymentService} from './development/code-deployment.service';
import {BugFixingService} from './development/bug-fixing.service';
import {ITickSubscriber} from '../../i-tick-subscriber';
import {CodeTestingService} from './development/code-testing.service';

@Injectable()
export class StaffActionAccumulatorService implements OnDestroy, ITickSubscriber {
   private sub: Subscription;
   private executors: TickExecutor[] = [];

   constructor(private codeWritingService: CodeWritingService,
               private codeTestingService: CodeTestingService,
               private codeDeploymentService: CodeDeploymentService,
               private bugFixingService: BugFixingService) {
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

   public subscribe(tickService: TickService) {
      this.sub = tickService
         .pipeline
         .subscribe((tick: Tick) => this.executors.forEach(e => e.execute(tick)));
   }

   public stop(){
      this.sub && this.sub.unsubscribe();
   }
}
