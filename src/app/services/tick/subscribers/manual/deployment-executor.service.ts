import {Injectable, OnDestroy} from '@angular/core';
import {LoggerService} from '../../../logging/logger-service';
import {Subject} from 'rxjs/Subject';
import {CodeService} from '../../../resource-services/code.service';
import 'rxjs/Rx';
import {TickService} from 'app/services/tick/tick.service';
import {ConfigurationService} from '../../../config/configuration.service';
import * as moment from 'moment';
import {GameStorageService} from '../../../persistence/game-storage.service';
import {LogType} from '../../../../models/definitions/log-type';
import {Subscription} from 'rxjs/Subscription';
import {DeploymentInfoService} from '../../../resource-services/deployment-info.service';

@Injectable()
export class DeploymentExecutor implements OnDestroy {
   private gameLoadedSub: Subscription;
   private tickerSub: Subscription;

   private source = new Subject();
   public pipeline = this.source.asObservable();

   constructor(private codeService: CodeService,
               private tickService: TickService,
               private config: ConfigurationService,
               private deploymentInfo: DeploymentInfoService,
               private gameStorageService: GameStorageService,
               private logger: LoggerService) {
      this.gameLoadedSub = this.gameStorageService.loadedPipeline.subscribe(() => {
         this.stop();
         if (this.deploying)
            this.resumeDeploy();
      });
   }

   ngOnDestroy(): void { this.stop(); }

   public stop(){
      if (this.tickerSub){
         this.tickerSub.unsubscribe();
      }
   }

   public get deploying(){
      return this.deploymentInfo.deploying;
   }

   public get lastDeployedDate(){
      return this.deploymentInfo.lastDeployedDate;
   }

   public get canDeploy(){
      return !this.deploying && this.codeService.tested.balance >= this.config.MINIMUM_TESTED_CODE_FOR_DEPLOY;
   }

   public resumeDeploy(){
      if (!this.deploying)
         throw Error('You are not deploying, so you may not resume');
      let rate = this.deploymentInfo.currentDeployRate;
      this.executeDeploy(rate);
   }

   public deploy(count: number, time: moment.Moment, rate: number = this.config.BASE_DEPLOY_RATE): void {
      if (this.deploying)
         throw Error('You are already deploying!');

      this.deploymentInfo.deploying = true;
      this.deploymentInfo.currentDeployRate = rate;
      this.deploymentInfo.lastDeployInitiatedUtc = time;
      let linesOfCodeToDeploy = this.codeService.moveTestedToDeploying(count);
      //this.logger.gameLog(`Beginning deployment of ${Math.floor(linesOfCodeToDeploy)} lines of code...`);

      this.executeDeploy(rate);
   }

   private executeDeploy(rate: number) {
      this.tickerSub = this.tickService.pipeline
         .takeWhile(() => {
            return this.codeService.deploying.balance > 0 //TODO: deployment key for separate deploys
         })
         .subscribe(
            (tick) => {
               this.deploymentInfo.lastDeployedDate = tick.date;
               this.deployCodeForMsElapsed(tick.msElapsed, rate);
            },
            () => {
               throw Error('Something went wrong in the deployment')
            },
            () => {
               this.deploymentInfo.deploying = false;
               let deploymentDurationHours = this.deploymentInfo.lastDeployedDate.diff(this.deploymentInfo.lastDeployInitiatedUtc, 'hours');
               this.deploymentInfo.incrementDeployCount(1);
               this.logger.gameLog(`Done deployment! Took ${deploymentDurationHours} hrs.`, LogType.Info);
               this.source.next();
            });
   }

   private deployCodeForMsElapsed(ms: number, rate: number) {
      let count = Math.min(ms * rate, this.codeService.deploying.balance);
      this.codeService.moveDeployingToDeployed(count);
   }
}
