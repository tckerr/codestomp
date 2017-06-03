import {Injectable} from '@angular/core';
import {CustomerAccumulatorService} from './tick/subscribers/automatic/accumulators/customer-accumulator.service';
import {CodeProfitAccumulatorService} from './tick/subscribers/automatic/accumulators/code-profit-accumulator.service';
import {StaffActionAccumulatorService} from './tick/subscribers/automatic/accumulators/staff-actions/staff-action-accumulator.service';
import {StaffSalaryAccumulatorService} from './tick/subscribers/automatic/accumulators/staff-salary-accumulator.service';
import {ITickSubscriber} from './tick/subscribers/automatic/i-tick-subscriber';
import {TalentGeneratorService} from './tick/subscribers/automatic/generators/talent-generator-service';
import {SpecialEventGeneratorService} from './tick/subscribers/automatic/generators/special-event-generator.service';
import {TickService} from './tick/tick.service';
import {AchievementUnlockListenerService} from './tick/subscribers/automatic/listeners/achievement-unlock-listener.service';
import {IListener} from './listeners/i-listener';
import {BusinessUnitUnlockListenerService} from './listeners/business-unit-unlock-listener.service';

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
               businessUnitUnlockListenerService: BusinessUnitUnlockListenerService,
   ) {
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
