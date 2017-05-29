import {Injectable} from '@angular/core';
import {LoggerService} from '../logger-service';
import {GameStorageService} from '../game-storage.service';
import {DevelopmentBusinessUnit} from '../../models/business-units/development-business-unit';
import {BusinessUnits} from '../../models/business-units/business-units.enum';
import {QuitterNotificationService} from '../quitter-notification.service';
import {ConfigurationService} from '../configuration.service';

@Injectable()
export class DeveloperStaffService {

   constructor(private gameStorageService: GameStorageService,
               private quitterNotificationService: QuitterNotificationService,
               private config: ConfigurationService,
               private logger: LoggerService) {
   }

   //TODO: a class, also remove from DevelopmentComponent
   private get businessUnit(): DevelopmentBusinessUnit {
      let businessUnits = this.gameStorageService.game.company.businessUnits;
      for (let i = 0; i < businessUnits.length; ++i) {
         if (businessUnits[i].id == BusinessUnits.Development)
            return (<DevelopmentBusinessUnit>businessUnits[i]);
      }
      throw Error('Business unit not found!');
   }

   public addAssociateDev() {
      this.logger.gameLog('Hired an associate developer!');
      this.businessUnit.staff.associateDeveloper++;
   }

   public addJuniorDev() {
      this.logger.gameLog('Hired a junior developer!');
      this.businessUnit.staff.juniorDeveloper++;
   }

   public addSeniorDev() {
      this.logger.gameLog('Hired a senior developer!');
      this.businessUnit.staff.seniorDeveloper++;
   }

   public addQaAnalyst() {
      this.logger.gameLog('Hired a QA analyst!');
      this.businessUnit.staff.qaAnalyst++;
   }

   public addSeniorQaAnalyst() {
      this.logger.gameLog('Hired a senior QA analyst!');
      this.businessUnit.staff.seniorQaAnalyst++;
   }

   public addQaAutomationEngineer() {
      this.logger.gameLog('Hired a QA automation engineer!');
      this.businessUnit.staff.qaAutomationEngineer++;
   }

   public get staff() {
      return this.businessUnit.staff;
   }

   // TODO: move to diff class
   // TODO: offset quit chance with time
   public chanceRandomQuit(ms: number){
      if(!this.businessUnit.$totalStaff)
         return;

      if(Math.random() > (ms * this.config.quitChanceOnLackOfPayment))
         return;

      let keys = Object.keys(this.businessUnit.staff);
      while (keys) {
         let type = keys[Math.floor(Math.random() * keys.length)];
         if (this.businessUnit.staff[type]){
            this.quitType(type);
            break;
         }
         let index = keys.indexOf(type);
         keys.splice(index, 1);
      }
   }

   private quitType(type: string) {
      this.businessUnit.staff[type]--;
      let message = "";
      switch (type) {
         case "associateDeveloper":
            message = "An Associate Developer";
            break;
         case "juniorDeveloper":
            message = "A Junior Developer";
            break;
         case "seniorDeveloper":
            message = "A Senior Developer";
            break;
         case "qaAnalyst":
            message = "A QA Analyst";
            break;
         case "seniorQaAnalyst":
            message = "A Senior QA Analyst";
            break;
         case "qaAutomationEngineer":
            message = "A QA Automation Engineer";
            break;
      }
      this.quitterNotificationService.newQuitter(message, "lack of payment");
   }

}
