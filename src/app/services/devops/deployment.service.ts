import {Injectable} from '@angular/core';
import {LoggerService} from '../logger-service';
import {Subject} from 'rxjs/Subject';
import {CodeService} from '../resource-services/code.service';
import 'rxjs/Rx';
import {TickService} from 'app/services/tick/tick.service';
import {ConfigurationService} from '../configuration.service';
import * as moment from 'moment';

@Injectable()
export class DeploymentService {
   ngOnInit(): void {
   }

   private source = new Subject();
   public pipeline = this.source.asObservable();
   public deploying: boolean = false;

   constructor(private codeService: CodeService,
               private tickService: TickService,
               private config: ConfigurationService,
               private logger: LoggerService) {
   }

   public deploy(): void {
      if (this.deploying)
         throw Error('You are already deploying!');

      this.deploying = true;
      let linesOfCodeToDeploy = this.codeService.moveTestedToDeploying();
      this.logger.gameLog(`Beginning deployment of ${linesOfCodeToDeploy} lines of code...`);
      this.source.next();
      let deploymentTime = moment();
      this.tickService.pipeline
         .takeWhile(() => {
            return this.codeService.deploying.balance > 0
         })
         .subscribe(
            (tick) => this.deployCodeForMsElapsed(tick.msElapsed),
            () => {
               throw Error('Something went wrong in the deployment')
            },
            () => {
               this.deploying = false;
               let deploymentDurationSeconds = moment().diff(deploymentTime, 's');
               this.logger.gameLog(`Done deployment! Took ${deploymentDurationSeconds}s.`, );
            });
   }

   private deployCodeForMsElapsed(ms: number) {
      let count = Math.min(ms * this.config.deployChunkRate, this.codeService.deploying.balance);
      this.codeService.moveDeployingToDeployed(count);
   }
}
