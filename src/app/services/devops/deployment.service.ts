import {Injectable} from '@angular/core';
import {LoggerService} from '../logger-service';
import {Subject} from 'rxjs/Subject';
import {CodeService} from '../resource-services/code.service';
import 'rxjs/Rx';
import {TickService} from 'app/services/tick/tick.service';
import {ConfigurationService} from '../configuration.service';

@Injectable()
export class DeploymentService  {
   ngOnInit(): void {}

   private source = new Subject();
   public pipeline = this.source.asObservable();
   public deploying: boolean = false;

   constructor(
      private codeService: CodeService,
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
      this.tickService.pipeline
         .takeWhile(() => {
            return this.codeService.deploying.balance > 0
         })
         .subscribe(
            () => this.moveToDeployed(),
            () => { throw Error('Something went wrong in the deployment') },
            () => {
               this.deploying = false;
               this.logger.gameLog('Done deployment!');
            });
   }

   private moveToDeployed() {
      let count = Math.min(this.config.deployChunk, this.codeService.deploying.balance);
      this.codeService.moveDeployingToDeployed(count);
   }
}
