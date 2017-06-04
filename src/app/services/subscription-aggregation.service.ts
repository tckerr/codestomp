import {Injectable} from '@angular/core';
import {TickService} from '../time/tick.service';
import {IListener} from '../game/listeners/i-listener';
import {BusinessUnitUnlockListenerService} from '../game/listeners/business-unit-unlock-listener.service';
import {TalentGeneratorService} from '../game/tick-subscribers/automatic/generators/talent-generator-service';
import {ITickSubscriber} from '../game/tick-subscribers/automatic/i-tick-subscriber';
import {SpecialEventGeneratorService} from '../game/tick-subscribers/automatic/generators/special-event-generator.service';
import {CustomerAccumulatorService} from '../game/tick-subscribers/automatic/accumulators/customer-accumulator.service';
import {StaffActionAccumulatorService} from '../game/tick-subscribers/automatic/accumulators/staff-actions/staff-action-accumulator.service';
import {StaffSalaryAccumulatorService} from '../game/tick-subscribers/automatic/accumulators/staff-salary-accumulator.service';
import {AchievementUnlockListenerService} from '../game/tick-subscribers/automatic/listeners/achievement-unlock-listener.service';
import {CodeProfitAccumulatorService} from '../game/tick-subscribers/automatic/accumulators/code-profit-accumulator.service';

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
