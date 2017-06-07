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
   public popoverContents = 'Scouting for talent in the job market is important to keep your hiring pipeline full.';
   public label = 'Scout job market';
   public iconClass = 'fa-search';
   public visible = true;
   public disabled = false;

   constructor(private config: ConfigurationService,
               skillsService: SkillsService,
               fundService: FundService) {
      super(skillsService, fundService);
   }

   public get value() {
      return this.skillsService.skills.scouting.balance + this.config.SCOUTING_CONSTANT;
   }

   public execute() {
      //this.codeService.test(this.value, this.config.BASE_TESTING_FAILURE_PCT);
      console.log("Scout")
   }

}
