import {IManualAction} from '../../manual-actions/i-manual-action';
import {Injectable} from '@angular/core';
import {UnlockableFeature} from '../../../../models/achievements/unlockable-feature.enum';
import {CodeService} from '../../../resource-services/code.service';
import {ConfigurationService} from '../../../../configuration/configuration.service';
import {UnlocksService} from '../../../achievements/unlocks.service';
import {SkillsService} from '../../../resource-services/skills.service';

@Injectable()
export class BugfixAction implements IManualAction {
   id: string = 'bugfix';
   public buttonTheme = 'btn-danger';
   public popoverContents = '<strong>Bugs</strong> affect customer acquisition rate negatively. Squash bugs to grow faster!';
   public label = 'Fix some bugs';
   public iconClass = 'fa-bug';

   constructor(private codeService: CodeService,
               private config: ConfigurationService,
               private unlocksService: UnlocksService,
               private skillsService: SkillsService) {
   }

   public get value() {
      return this.skillsService.skills.bugFixing.balance + this.config.BUG_FIX_CONSTANT;
   }

   public execute() {
      this.codeService.bugFix(this.value);
   }

   public get visible() {
      return this.unlocksService.isUnlocked(UnlockableFeature.ManualBugFixes);
   }

   public get disabled() {
      return this.codeService.bugs.balance <= 0;
   }

}
