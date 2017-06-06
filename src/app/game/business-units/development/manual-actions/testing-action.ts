import {IManualAction} from '../../manual-actions/i-manual-action';
import {Injectable} from '@angular/core';
import {UnlockableFeature} from '../../../../models/achievements/unlockable-feature.enum';
import {CodeService} from '../../../resource-services/code.service';
import {ConfigurationService} from '../../../../configuration/configuration.service';
import {UnlocksService} from '../../../achievements/unlocks.service';
import {SkillsService} from '../../../resource-services/skills.service';

@Injectable()
export class TestingAction implements IManualAction {
   id: string = 'testing';
   public buttonTheme = 'btn-info';
   public popoverContents = 'All code must be <strong>tested</strong> before it is deployed. Remember, not all tested code works!';
   public label = 'Test your code';
   public iconClass = 'fa-check-square-o';

   constructor(private codeService: CodeService,
               private config: ConfigurationService,
               private unlocksService: UnlocksService,
               private skillsService: SkillsService) {
   }

   public get value() {
      return this.skillsService.skills.testing.balance + this.config.CODE_TESTED_CONSTANT;
   }

   public execute() {
      this.codeService.test(this.value, this.config.BASE_TESTING_FAILURE_PCT);
   }

   public get visible() {
      return this.unlocksService.isUnlocked(UnlockableFeature.ManualTesting);
   }

   public get disabled() {
      return this.codeService.pushed.balance <= 0;
   }

}
