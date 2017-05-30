import {Injectable} from '@angular/core';
import {GameStorageService} from './game-storage.service';
import {TickService} from './tick/tick.service';
import {ConfigurationService} from './configuration.service';
import {CodeService} from './resource-services/code.service';
import {LoggerService, LogType} from './logger-service';
import {FundService} from './resource-services/fund.service';
import {Unlocks} from '../models/unlocks';
import {ExperienceLevel} from '../models/definitions/staff-definitions';
import {SpecialEventGeneratorService} from './generators/special-events/special-event-generator.service';
import {SpecialEventDisplayType} from '../models/special-event';
import {NotificationService} from './generators/special-events/notification.service';

@Injectable()
export class UnlocksService {

   constructor(private gameStorageService: GameStorageService,
               private config: ConfigurationService,
               private codeService: CodeService,
               private fundService: FundService,
               private logger: LoggerService,
               private notificationService: NotificationService,
               private tickService: TickService) {
      this.tickService.pipeline.subscribe(() => this.checkUnlocks())
   }

   public get unlocks() {
      return this.gameStorageService.game.company.unlocks;
   }

   private checkUnlocks() {
      if (this.unlocks.deployments == 0 && this.config.deploymentsWhenTestedCodeGte <= this.codeService.tested.totalAccumulated) {
         this.gameStorageService.game.company.unlocks.deployments++;
         this.notificationService.notify(
            'Just a little more...', 'You\'ve almost got enough for your app. Get ready to ship code to production!', LogType.Info);
      }
      if (this.unlocks.manualTesting == 0 && this.config.manualTestingWhenTotalCodeGte <= this.codeService.total) {
         this.gameStorageService.game.company.unlocks.manualTesting++;
         this.notificationService.notify(
            'Time to test', 'Boring, we know. But testing is important!', LogType.Info);
      }
      if (this.unlocks.bugFixes > 0 && this.unlocks.devHiring <= 3) {
         if(this.config.unlockDevHiringWhenFundsGte[this.unlocks.devHiring] <= this.fundService.funds.totalAccumulated){
            this.gameStorageService.game.company.unlocks.devHiring++;
            let message = `Development Hiring tier ${this.unlocks.devHiring} unlocked`;
            this.notificationService.notify(
               message, 'You\'ve got a whole new set of options, although they\'re surely expensive....', LogType.Success);
         }
      }
      if (this.unlocks.bugFixes == 0 && this.config.unlockBugFixesWhenBugsGte <= this.codeService.bugs.totalAccumulated) {
         this.gameStorageService.game.company.unlocks.bugFixes++;
         this.notificationService.notify(
            'Bugs! Oh my!', 'There\'s some bugs in production. Fix them!', LogType.Error);
      }
   }


   public devStaffAtExperienceIsUnlocked(exp: ExperienceLevel){
      return this.unlocks.devHiring >= this.experienceTypeToUnlockTier(exp);
   }

   public experienceTypeToUnlockTier(exp: ExperienceLevel){
      switch (exp){
         case ExperienceLevel.Junior:
            return 2;
         case ExperienceLevel.Senior:
            return 3;
         default:
            return 1;
      }
   }
}
