import { Injectable } from '@angular/core';
import {TickExecutor} from '../../../interfaces/tick-executor';
import {DeveloperStaffService} from '../../../resource-services/developer-staff.service';
import {Tick} from '../../../../models/tick/tick';
import {DeploymentExecutor} from '../../../devops/deployment-executor.service';
import {StaffCategory} from '../../../../models/definitions/staff-definitions';
import {ConfigurationService} from '../../../configuration.service';
import * as Enumerable from 'linq';

@Injectable()
export class CodeDeploymentService implements TickExecutor {


   constructor(private executor: DeploymentExecutor,
               private config: ConfigurationService,
               private developerStaff: DeveloperStaffService,) {
   }

   public execute(tick: Tick) {
      let readyEngineers = this.getReadyEngineers(tick);
      if(readyEngineers){
         let msIn12Hours = 1000 * 60 * 60 * 12;
         let deploymentCapability = this.getDeploymentCapabilityForMs(msIn12Hours, readyEngineers);
         if(deploymentCapability > 0)
            this.executor.deploy(deploymentCapability, tick.date, this.config.deployChunkRate * readyEngineers);
      }
   }

   private getReadyEngineers(tick: Tick) {
      if (!this.executor.canDeploy)
         return false;

      let timeSinceLastDeploy = tick.date.diff(this.executor.lastDeployedDate, "hours");
      let hasBeenAtLeast12Hours = timeSinceLastDeploy >= 12;
      if(!hasBeenAtLeast12Hours)
         return false;

      return Enumerable
         .from(this.developerStaff.staff)
         .where(s => s.hired && s.category == StaffCategory.DevOps)
         .sum(s => s.hired);
   }

   private getDeploymentCapabilityForMs(ms: number, engineers: number) {
      let rate = ms * this.config.deployAmountPerMs;
      return engineers * rate;
   }
}
