import {Injectable} from '@angular/core';
import {GameStorageService} from './game-storage.service';
import {TickService} from './tick/tick.service';
import {ConfigurationService} from './configuration.service';
import {CodeService} from './resource-services/code.service';
import {LoggerService} from './logger-service';
import {FundService} from './resource-services/fund.service';
import {Unlocks} from '../models/unlocks';
import {ExperienceLevel} from '../models/definitions/staff-definitions';

@Injectable()
export class UnlocksService {

   constructor(private gameStorageService: GameStorageService,
               private config: ConfigurationService,
               private codeService: CodeService,
               private fundService: FundService,
               private logger: LoggerService,
               private tickService: TickService) {
      this.tickService.pipeline.subscribe(() => this.checkUnlocks())
   }

   public get unlocks() {
      return this.gameStorageService.game.company.unlocks;
   }

   private checkUnlocks() {
      if (this.unlocks.deployments == 0 && this.config.deploymentsWhenTestedCodeGte <= this.codeService.tested.totalAccumulated) {
         this.gameStorageService.game.company.unlocks.deployments++;
         this.logger.gameLog('Deployments unlocked!');
      }
      if (this.unlocks.manualTesting == 0 && this.config.manualTestingWhenTotalCodeGte <= this.codeService.total) {
         this.gameStorageService.game.company.unlocks.manualTesting++;
         this.logger.gameLog('Manual testing unlocked!');
      }
      if (this.unlocks.devHiring <= 3) {
         if(this.config.unlockDevHiringWhenFundsGte[this.unlocks.devHiring] <= this.fundService.funds.totalAccumulated){
            this.gameStorageService.game.company.unlocks.devHiring++;
            this.logger.gameLog(`Hiring tier ${this.unlocks.devHiring} unlocked!`);
         }
      }
      if (this.unlocks.bugFixes == 0 && this.config.unlockBugFixesWhenBugsGte <= this.codeService.bugs.totalAccumulated) {
         this.gameStorageService.game.company.unlocks.bugFixes++;
         this.logger.gameLog('Bug fixing unlocked!');
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
