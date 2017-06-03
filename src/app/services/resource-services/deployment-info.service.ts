import {Injectable} from '@angular/core';
import {GameStorageService} from '../persistence/game-storage.service';
import * as moment from 'moment';

@Injectable()
export class DeploymentInfoService {

   constructor(private gameStorageService: GameStorageService) {
   }

   private get devBusinessUnit() {
      return this.gameStorageService.game.company.businessUnits.development;
   }

   public set deploying(isDeploying: boolean) {
      this.devBusinessUnit.deploymentInfo.deploying = isDeploying;
   }

   public get deploying() {
      return this.devBusinessUnit.deploymentInfo.deploying;
   }

   public get currentDeployRate(){
      return this.devBusinessUnit.deploymentInfo.currentDeployRate;
   }

   public set currentDeployRate(value: number){
      this.devBusinessUnit.deploymentInfo.currentDeployRate = value;
   }

   public set lastDeployedDate(date: moment.Moment) {
      this.devBusinessUnit.deploymentInfo.lastDeployUtc = date.format();
   }

   public get lastDeployedDate() {
      return moment(this.devBusinessUnit.deploymentInfo.lastDeployUtc);
   }

   public set lastDeployInitiatedUtc(date: moment.Moment) {
      this.devBusinessUnit.deploymentInfo.lastDeployInitiatedUtc = date.format();
   }

   public get lastDeployInitiatedUtc() {
      return moment(this.devBusinessUnit.deploymentInfo.lastDeployInitiatedUtc);
   }

   public incrementDeployCount(count: number = 1){
      this.devBusinessUnit.deploymentInfo.deployCount += count;
   }

}
