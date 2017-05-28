import {Injectable} from '@angular/core';
import {GameStorageService} from './game-storage.service';
import {TickService} from './tick/tick.service';
import {ConfigurationService} from './configuration.service';
import {CodeService} from './resource-services/code.service';
import {LoggerService} from './logger-service';
import {FundService} from './resource-services/fund.service';
import {Unlocks} from '../models/unlocks';

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
      if (this.unlocks.devHiring == 0 && this.config.unlockDevHiringWhenFundsGte <= this.fundService.funds.totalAccumulated) {
         this.gameStorageService.game.company.unlocks.devHiring++;
         this.logger.gameLog('Hiring unlocked!');
      }

   }
}
