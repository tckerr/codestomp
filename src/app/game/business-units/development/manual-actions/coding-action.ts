import {IManualAction} from '../../manual-actions/i-manual-action';
import {Injectable} from '@angular/core';
import {CodeService} from '../../../resource-services/code.service';
import {ConfigurationService} from '../../../../configuration/configuration.service';
import {SkillsService} from '../../../resource-services/skills.service';
import {CommitGeneratorService} from '../../../../utilities/commit-generator.service';
import {LoggerService} from '../../../../logging/logger-service';

@Injectable()
export class CodingAction implements IManualAction {
   id: string = 'coding';
   public buttonTheme = 'btn-info';
   public popoverContents = 'Code is the lifeblood of your application... get typing!';
   public label = 'Write some code';
   public iconClass = 'fa-keyboard-o';
   public visible = true;
   public disabled = false;

   constructor(private commitGeneratorService: CommitGeneratorService,
               private loggerService: LoggerService,
               private codeService: CodeService,
               private config: ConfigurationService,
               private skillsService: SkillsService,) {
   }

   public get value() {
      return this.skillsService.skills.coding.balance + this.config.CODE_GENERATED_CONSTANT;
   }

   public execute() {
      let commit = this.commitGeneratorService.generate();
      this.loggerService.gameLog(commit);
      let effectiveValue = this.value;
      this.codeService.write(effectiveValue);
   }

}
