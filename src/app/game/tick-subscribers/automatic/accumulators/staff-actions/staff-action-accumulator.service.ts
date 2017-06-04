import {Injectable} from '@angular/core';
import {TickService} from '../../../../../time/tick.service';
import {Tick} from '../../../../../models/tick/tick';
import {CodeWritingService} from './development/code-writing.service';
import {TickExecutor} from '../../tick-executor';
import {CodeDeploymentService} from './development/code-deployment.service';
import {BugFixingService} from './development/bug-fixing.service';
import {ITickSubscriber} from '../../i-tick-subscriber';
import {CodeTestingService} from './development/code-testing.service';
import {TickSubscriberBase} from '../../tick-subscriber-base';

@Injectable()
export class StaffActionAccumulatorService extends TickSubscriberBase implements ITickSubscriber {
   private executors: TickExecutor[] = [];

   constructor(private codeWritingService: CodeWritingService,
               private codeTestingService: CodeTestingService,
               private codeDeploymentService: CodeDeploymentService,
               private bugFixingService: BugFixingService) {
      super();
      this.executors = [
         bugFixingService,
         codeTestingService,
         codeDeploymentService,
         codeWritingService,
      ];
   }

   public subscribe(tickService: TickService) {
      this.tickerSubscription = tickService
         .pipeline
         .subscribe((tick: Tick) => this.executors.forEach(e => e.execute(tick)));
   }
}
