import {Injectable} from '@angular/core';
import {GraduateDeveloperGeneratorService} from '../generators/graduate-developer-generator.service';
import {LoggerService} from '../logger-service';
import {DeveloperStaffService} from '../resource-services/developer-staff.service';

@Injectable()
export class DeveloperHiringPoolService {

   constructor(private graduateDeveloperGeneratorService: GraduateDeveloperGeneratorService,
               private developerStaffService: DeveloperStaffService,
               private logger: LoggerService) {
   }

   public get candidates(){
      return this.graduateDeveloperGeneratorService.available;
   }

   public addAssociateDev() {
      this.graduateDeveloperGeneratorService.hire();
      this.developerStaffService.addAssociateDev();
   }

   public addJuniorDev() {
      this.graduateDeveloperGeneratorService.hire();
      this.developerStaffService.addJuniorDev();
   }

   public addSeniorDev() {
      this.graduateDeveloperGeneratorService.hire();
      this.developerStaffService.addSeniorDev();
   }

   public addQaAnalyst() {
      this.graduateDeveloperGeneratorService.hire();
      this.developerStaffService.addQaAnalyst();
   }

   public addSeniorQaAnalyst() {
      this.graduateDeveloperGeneratorService.hire();
      this.developerStaffService.addSeniorQaAnalyst();
   }

   public addQaAutomationEngineer() {
      this.graduateDeveloperGeneratorService.hire();
      this.developerStaffService.addQaAutomationEngineer();
   }

}
