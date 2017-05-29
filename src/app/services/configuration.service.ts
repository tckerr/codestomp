import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';

@Injectable()
export class ConfigurationService {

   // manual input rates
   public codePerClick = environment.gameSettings.defaults.codePerClick;
   public manualTestsPerClick = environment.gameSettings.defaults.manualTestsPerClick;

   // devops rates
   public deployThreshold = environment.gameSettings.defaults.deployThreshold;
   public deployChunkRate = environment.gameSettings.defaults.deployChunkRate;
   public bugsPercentage = environment.gameSettings.defaults.bugsPercentage;

   // dev staff performance rates
   public associateDeveloperCodeGrowthRate = environment.gameSettings.defaults.associateDeveloperCodeGrowthRate;
   public juniorDeveloperCodeGrowthRate = environment.gameSettings.defaults.juniorDeveloperCodeGrowthRate;
   public seniorDeveloperCodeGrowthRate = environment.gameSettings.defaults.seniorDeveloperCodeGrowthRate;

   public qaAnalystTestRate = environment.gameSettings.defaults.qaAnalystTestRate;
   public seniorQaAnalystTestRate = environment.gameSettings.defaults.seniorQaAnalystTestRate;
   public qaAutomationEngineerTestRate = environment.gameSettings.defaults.qaAutomationEngineerTestRate;

   public quitChanceOnLackOfPayment = environment.gameSettings.defaults.quitChanceOnLackOfPayment;

   //salary
   public associateDeveloperSalary = environment.gameSettings.defaults.associateDeveloperSalary;
   public juniorDeveloperSalary = environment.gameSettings.defaults.juniorDeveloperSalary;
   public seniorDeveloperSalary = environment.gameSettings.defaults.seniorDeveloperSalary;
   public associateQaAnalystSalary = environment.gameSettings.defaults.associateQaAnalystSalary;
   public seniorQaAnalystSalary = environment.gameSettings.defaults.seniorQaAnalystSalary;
   public qaAutomationEngineerSalary = environment.gameSettings.defaults.qaAutomationEngineerSalary;

   // customer growth
   public customersCapAsPercentOfCode = environment.gameSettings.defaults.customersCapAsPercentOfCode;
   public customersToDeployedCodeGrowthRate = environment.gameSettings.defaults.customersToDeployedCodeGrowthRate;
   public customersToDeployedCodeGrowthShare = environment.gameSettings.defaults.customersToDeployedCodeGrowthShare;
   public wordOfMouthGrowthRate = environment.gameSettings.defaults.wordOfMouthGrowthRate;
   public wordOfMouthGrowthShare = environment.gameSettings.defaults.wordOfMouthGrowthShare;

   // funds growth
   public customersToProfitGrowthRate = environment.gameSettings.defaults.customersToProfitGrowthRate;

   // job markets
   public newGraduatesIntervalMs = environment.gameSettings.defaults.newGraduatesIntervalMs;

   // unlocks
   public deploymentsWhenTestedCodeGte = environment.gameSettings.unlockThresholds.deploymentsWhenTestedCodeGte;
   public manualTestingWhenTotalCodeGte = environment.gameSettings.unlockThresholds.manualTestingWhenTotalCodeGte;
   public unlockDevHiringWhenFundsGte = environment.gameSettings.unlockThresholds.unlockDevHiringWhenFundsGte;

}
