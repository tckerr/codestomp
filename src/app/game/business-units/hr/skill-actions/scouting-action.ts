import {Injectable} from '@angular/core';
import {UnlockableFeature} from '../../../../models/achievements/unlockable-feature.enum';
import {CodeService} from '../../../resource-services/code.service';
import {ConfigurationService} from '../../../../configuration/configuration.service';
import {UnlocksService} from '../../../achievements/unlocks.service';
import {SkillsService} from '../../../resource-services/skills.service';
import {ImprovableSkill} from '../../skill-actions/improvable-skill';
import {FundService} from '../../../resource-services/fund.service';
import {ISkillAction} from '../../skill-actions/i-skill-action';

@Injectable()
export class ScoutingAction extends ImprovableSkill implements ISkillAction {
   public skillId = 'scouting';
   public buttonTheme = 'btn-info';
   public popoverContents = 'todo';
   public label = 'Scout hiring prospects';
   public iconClass = 'fa-?';
   public visible = true;

   constructor(private codeService: CodeService,
               private config: ConfigurationService,
               private unlocksService: UnlocksService,
               skillsService: SkillsService,
               fundService: FundService) {
      super(skillsService, fundService);
   }

   public get value() {
      return this.skillsService.skills.scouting.balance + this.config.SCOUTING_CONSTANT;
   }

   public execute() {
      //this.codeService.test(this.value, this.config.BASE_TESTING_FAILURE_PCT);
   }

   public get visible() {
      //return this.unlocksService.isUnlocked(UnlockableFeature.ManualTesting);
   }

   public get disabled() {
      //return this.codeService.pushed.balance <= 0;
   }

}
