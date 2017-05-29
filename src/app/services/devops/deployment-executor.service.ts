import {Injectable} from '@angular/core';
import {LoggerService} from '../logger-service';
import {Subject} from 'rxjs/Subject';
import {CodeService} from '../resource-services/code.service';
import 'rxjs/Rx';
import {TickService} from 'app/services/tick/tick.service';
import {ConfigurationService} from '../configuration.service';
import * as moment from 'moment';
import {DevelopmentBusinessUnitAccessorService} from '../resource-services/development-business-unit-accessor.service';

@Injectable()
export class DeploymentExecutor {

   private source = new Subject();
   public pipeline = this.source.asObservable();
   public deploying: boolean = false;

   constructor(private codeService: CodeService,
               private tickService: TickService,
               private config: ConfigurationService,
               private devAccessor: DevelopmentBusinessUnitAccessorService,
               private logger: LoggerService) {

   }

   public set lastDeployedDate(date: moment.Moment){
      this.devAccessor.businessUnit.deploymentInfo.lastDeployUtc = date.format();
   }

   public get lastDeployedDate(){
      return moment(this.devAccessor.businessUnit.deploymentInfo.lastDeployUtc);
   }

   public get canDeploy(){
      return !this.deploying && this.codeService.tested.balance >= this.config.deployThreshold
   }

   public deploy(count: number, time: moment.Moment, rate: number = this.config.deployChunkRate): void {
      if (this.deploying)
         throw Error('You are already deploying!');

      this.deploying = true;
      let linesOfCodeToDeploy = this.codeService.moveTestedToDeploying(count);
      this.logger.gameLog(`Beginning deployment of ${Math.floor(linesOfCodeToDeploy)} lines of code...`);
      this.source.next();
      this.lastDeployedDate = time; // TODO: store in company
      let lastDate = time;
      this.tickService.pipeline
         .takeWhile(() => {
            return this.codeService.deploying.balance > 0
         })
         .subscribe(
            (tick) => {
               lastDate = tick.date;
               this.deployCodeForMsElapsed(tick.msElapsed, rate);
            },
            () => {
               throw Error('Something went wrong in the deployment')
            },
            () => {
               this.deploying = false;
               let deploymentDurationHours = lastDate.diff(this.lastDeployedDate, 'hours');
               this.devAccessor.businessUnit.deploymentInfo.deployCount++;
               this.logger.gameLog(`Done deployment! Took ${deploymentDurationHours} hrs.`, );
            });
   }

   private deployCodeForMsElapsed(ms: number, rate:number) {
      let count = Math.min(ms * rate, this.codeService.deploying.balance);
      this.codeService.moveDeployingToDeployed(count);
   }
}
