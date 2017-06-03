import {Injectable} from '@angular/core';
import {environment} from '../../../environments/environment';

@Injectable()
export class ConfigurationService {

   // manual input rates
   public codePerClick = environment.gameSettings.defaults.codePerClick;
   public manualTestsPerClick = environment.gameSettings.defaults.manualTestsPerClick;

   // devops rates
   public deployThreshold = environment.gameSettings.defaults.deployThreshold;
   public deployChunkRate = environment.gameSettings.defaults.deployChunkRate;
   public deployAmountPerMs = environment.gameSettings.defaults.deployAmountPerMs;
   public bugsPercentage = environment.gameSettings.defaults.bugsPercentage;
   public testsFailurePercentage = environment.gameSettings.defaults.testsFailurePercentage;

   public quitChanceOnLackOfPayment = environment.gameSettings.defaults.quitChanceOnLackOfPayment;

   // customer growth
   public customersCapAsPercentOfCode = environment.gameSettings.defaults.customersCapAsPercentOfCode;
   public customersToDeployedCodeGrowthRate = environment.gameSettings.defaults.customersToDeployedCodeGrowthRate;
   public customersToDeployedCodeGrowthShare = environment.gameSettings.defaults.customersToDeployedCodeGrowthShare;
   public wordOfMouthGrowthRate = environment.gameSettings.defaults.wordOfMouthGrowthRate;
   public wordOfMouthGrowthShare = environment.gameSettings.defaults.wordOfMouthGrowthShare;

   // funds growth
   public customersToProfitGrowthRate = environment.gameSettings.defaults.customersToProfitGrowthRate;

   // job markets
   public talentGenerationPerMs = environment.gameSettings.defaults.talentGenerationPerMs;
   public talentGenerationCap = environment.gameSettings.defaults.talentGenerationCap;

   // unlocks
   public deploymentsWhenTestedCodeGte = environment.gameSettings.unlockThresholds.deploymentsWhenTestedCodeGte;
   public manualTestingWhenTotalCodeGte = environment.gameSettings.unlockThresholds.manualTestingWhenTotalCodeGte;
   public unlockDevHiringWhenFundsGte = environment.gameSettings.unlockThresholds.unlockDevHiringWhenFundsGte;
   public unlockBugFixesWhenBugsGte = environment.gameSettings.unlockThresholds.unlockBugFixesWhenBugsGte;

}
