import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';

@Injectable()
export class ConfigurationService {
   public codePerClick: number;
   public manualTestsPerClick: number;
   public deployChunk: number;
   public deployThreshold: number;

   public customersCapAsPercentOfCode: number;
   public customersToDeployedCodeGrowthRate: number;
   public customersToDeployedCodeGrowthShare: number;
   public wordOfMouthGrowthRate: number;
   public wordOfMouthGrowthShare: number;

   public customersToProfitGrowthRate: number;

   public bugsPercentage: number;

   // unlocks
   public deploymentsWhenTestedCodeGte: number;
   public manualTestingWhenTotalCodeGte: number;

   constructor() {
      this.codePerClick = environment.gameSettings.defaults.codePerClick;
      this.manualTestsPerClick = environment.gameSettings.defaults.manualTestsPerClick;
      this.deployChunk = environment.gameSettings.defaults.deployChunk;

      // customer growth
      this.customersCapAsPercentOfCode = environment.gameSettings.defaults.customersCapAsPercentOfCode;

      this.customersToDeployedCodeGrowthRate = environment.gameSettings.defaults.customersToDeployedCodeGrowthRate;
      this.customersToDeployedCodeGrowthShare = environment.gameSettings.defaults.customersToDeployedCodeGrowthShare;
      this.wordOfMouthGrowthRate = environment.gameSettings.defaults.wordOfMouthGrowthRate;
      this.wordOfMouthGrowthShare = environment.gameSettings.defaults.wordOfMouthGrowthShare;

      // funds growth
      this.customersToProfitGrowthRate = environment.gameSettings.defaults.customersToProfitGrowthRate;


      this.deployThreshold = environment.gameSettings.defaults.deployThreshold;
      this.bugsPercentage = environment.gameSettings.defaults.bugsPercentage;

      this.deploymentsWhenTestedCodeGte = environment.gameSettings.unlockThresholds.deploymentsWhenTestedCodeGte;
      this.manualTestingWhenTotalCodeGte = environment.gameSettings.unlockThresholds.manualTestingWhenTotalCodeGte;
   }


}
