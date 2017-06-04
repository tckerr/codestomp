import {Injectable} from '@angular/core';
import {TickService} from '../../time/tick.service';
import {IListener} from '../listeners/i-listener';
import {BusinessUnitUnlockListenerService} from '../listeners/business-unit-unlock-listener.service';
import {TalentGeneratorService} from './automatic/generators/talent-generator-service';
import {ITickSubscriber} from './automatic/i-tick-subscriber';
import {SpecialEventGeneratorService} from './automatic/generators/special-event-generator.service';
import {CustomerAccumulatorService} from './automatic/accumulators/customer-accumulator.service';
import {StaffActionAccumulatorService} from './automatic/accumulators/staff-actions/staff-action-accumulator.service';
import {StaffSalaryAccumulatorService} from './automatic/accumulators/staff-salary-accumulator.service';
import {AchievementUnlockListenerService} from './automatic/listeners/achievement-unlock-listener.service';
import {CodeProfitAccumulatorService} from './automatic/accumulators/code-profit-accumulator.service';

@Injectable()
export class SubscriptionAggregationService {

   private subscribers: ITickSubscriber[] = [];
   private listeners: IListener[] = [];

   constructor(private tickService: TickService,
               talentGeneratorService: TalentGeneratorService,
               specialEventGeneratorService: SpecialEventGeneratorService,
               customerAccumulator: CustomerAccumulatorService,
               developerCodeAccumulator: StaffActionAccumulatorService,
               staffSalaryAccumulatorService: StaffSalaryAccumulatorService,
               achievementUnlockListenerService: AchievementUnlockListenerService,
               codeProfitAccumulator: CodeProfitAccumulatorService,
               // listeners
               businessUnitUnlockListenerService: BusinessUnitUnlockListenerService,) {
      this.subscribers = [
         talentGeneratorService,
         specialEventGeneratorService,
         customerAccumulator,
         developerCodeAccumulator,
         staffSalaryAccumulatorService,
         achievementUnlockListenerService,
         codeProfitAccumulator,
      ];
      this.listeners = [
         businessUnitUnlockListenerService
      ];
   }

   public start() {
      this.subscribers.forEach(a => a.subscribe(this.tickService));
      this.listeners.forEach(a => a.subscribe());
   }

   public stop() {
      this.subscribers.forEach(a => a.unsubscribe());
      this.listeners.forEach(a => a.unsubscribe());
   }

   public restart() {
      this.stop();
      this.start();
   }


}
