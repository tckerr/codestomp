import {Injectable} from '@angular/core';
import {ITickSubscriber} from '../i-tick-subscriber';
import {TickSubscriberBase} from '../tick-subscriber-base';
import {TickService} from '../../../../time/tick.service';
import {AchievementsService} from '../../../achievements/achievements.service';
import {AchievementUnlockerService} from '../../../achievements/achievement-unlocker.service';
import {AchievementEvaluatorService} from '../../../achievements/achievement-evaluator.service';

@Injectable()
export class AchievementUnlockListenerService extends TickSubscriberBase implements ITickSubscriber {

   constructor(private achievementsService: AchievementsService,
               private evaluator: AchievementEvaluatorService,
               private unlocker: AchievementUnlockerService,) {
      super();
   }

   subscribe(tickService: TickService) {
      this.tickerSubscription = tickService.pipeline.subscribe(t => this.checkAchievementCriteria());
   }

   private checkAchievementCriteria() {
      this.achievementsService
         .pending
         .where(block => this.evaluator.achievementComplete(block))
         .forEach(block => this.unlocker.unlock(block));
   }

}
