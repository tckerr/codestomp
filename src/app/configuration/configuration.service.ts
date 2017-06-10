import {Injectable} from '@angular/core';
import {day, hour, month} from '../../environments/environment';
import {ExperienceLevel} from '../models/definitions/staff-definitions';

@Injectable()
export class ConfigurationService {

   public ASK_BEFORE_CLEARING_LOCAL_STORAGE = false;

   public INITIAL_GAME_DATE = '2050-01-01 00:00';

   // business units
   public FINANCE_UNLOCKED_AT_START = false;
   public DEVELOPMENT_UNLOCKED_AT_START = true;
   public CORPORATE_UNLOCKED_AT_START = false;
   public HR_UNLOCKED_AT_START = true;
   public MARKETING_UNLOCKED_AT_START = false;
   public DEBUG_UNLOCKED_AT_START = true;

   public GAME_TIME_ELAPSED_PER_SECOND = hour;
   public TPS_INCREMENT_MULTIPLIER = 1.1;
   public INITIAL_TPS = 60;
   public INITIAL_SPEED_MULTIPLIER = 1;
   public MAX_TPS = 150;

   // debug helpers, set to 0 in prod
   public CODE_GENERATED_CONSTANT = 0;//1000;
   public CODE_TESTED_CONSTANT = 0;//1000;
   public CODE_DEPLOY_CONSTANT = 0;//1000;
   public BUG_FIX_CONSTANT = 0;//1000;
   public SCOUTING_CONSTANT = 0;//1000;

   // devops rates
   public MINIMUM_TESTED_CODE_FOR_DEPLOY = 100;
   public BASE_DEPLOY_RATE = 67 / hour;
   public BASE_DEPLOY_CHUNK_SIZE = 30 / hour;
   public BASE_BUGS_TO_PRODUCTION_PCT = .05;
   public BASE_TESTING_FAILURE_PCT = .15;

   public QUIT_CHANCE_ON_LACK_OF_PAYMENT_RATE = .6 / hour;

   // customer growth
   public CUSTOMERS_CAP_AS_PCT_OF_PROD_CODE = .5;
   public CUSTOMERS_TO_PROD_CODE_GROWTH_RATE = .005 / hour;
   public WORD_OF_MOUTH_GROWTH_RATE = .000005 / hour;
   public CUSTOMERS_TO_PROD_CODE_GROWTH_SHARE_PCT = .8;
   public WORD_OF_MOUTH_GROWTH_SHARE_PCT = .2;

   // funds growth
   public CUSTOMERS_TO_PROFIT_RATE = 15 / month;

   // job markets
   public TALENT_GENERATION_RATE = 2 / day;
   public TALENT_CAP = 50; // TODO: make a growth

   // settings
   public SHOW_WELCOME_MODAL = false;
   public TALENT_COST_PER_EXPERIENCE: any;

   constructor() {
      this.TALENT_COST_PER_EXPERIENCE = {};
      this.TALENT_COST_PER_EXPERIENCE[ExperienceLevel.Intern] = 1;
      this.TALENT_COST_PER_EXPERIENCE[ExperienceLevel.Associate] = 1;
      this.TALENT_COST_PER_EXPERIENCE[ExperienceLevel.Junior] = 2;
      this.TALENT_COST_PER_EXPERIENCE[ExperienceLevel.Senior] = 3;
   }

}
