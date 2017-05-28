import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';

@Injectable()
export class ConfigurationService {
   public codePerClick: number;
   public deployChunk: number;
   public deployThreshold: number;
   public customersToDeployedCodeGrowthRate: number;
   public wordOfMouthGrowthRate: number;
   public customersToProfitGrowthRate: number;

   // unlocks
   public deploymentsWhenTotalCodeGte: number;

  constructor() {
     this.codePerClick = environment.gameSettings.defaults.codePerClick;
     this.deployChunk = environment.gameSettings.defaults.deployChunk;
     this.customersToDeployedCodeGrowthRate = environment.gameSettings.defaults.customersToDeployedCodeGrowthRate;
     this.wordOfMouthGrowthRate = environment.gameSettings.defaults.wordOfMouthGrowthRate;
     this.customersToProfitGrowthRate = environment.gameSettings.defaults.customersToProfitGrowthRate;
     this.deployThreshold = environment.gameSettings.defaults.deployThreshold;
     this.deploymentsWhenTotalCodeGte = environment.gameSettings.unlockThresholds.deploymentsWhenTotalCodeGte;
  }


}
