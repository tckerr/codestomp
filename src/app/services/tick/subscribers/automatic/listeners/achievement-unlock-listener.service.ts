import {Injectable} from '@angular/core';
import {ITickSubscriber} from '../i-tick-subscriber';
import {TickSubscriberBase} from '../tick-subscriber-base';
import {TickService} from '../../../tick.service';
import {Tick} from '../../../../../models/tick/tick';
import {AchievementsService} from '../../../../achievements/achievements.service';
import {AchievementBlock} from '../../../../../models/achievements/achievement-block';
import {AchievementCriteriaValueResolverService} from '../../../../achievements/achievement-criteria-value-resolver.service';
import {AchievementUnlockerService} from '../../../../achievements/achievement-unlocker.service';

@Injectable()
export class AchievementUnlockListenerService extends TickSubscriberBase implements ITickSubscriber {

   constructor(
      private achievementsService: AchievementsService,
      private valueResolver: AchievementCriteriaValueResolverService,
      private unlocker: AchievementUnlockerService,
   ) {
      super();
   }

   subscribe(tickService: TickService) {
      this.tickerSubscription = tickService.pipeline.subscribe(t => this.checkAchievementCriteria(t))
   }

   private checkAchievementCriteria(tick: Tick) {
      this.achievementsService.pending.forEach(block => this.resolvePendingAchievement(block))
   }

   private resolvePendingAchievement(block: AchievementBlock) {
      let value = this.valueResolver.typeToValue(block.criteriaType);
      let unlocked = value >= block.unlockWhenValueGte;
      if (unlocked)
         this.unlocker.unlock(block);
   }

}
