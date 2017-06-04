import {FundsResource} from '../resources/funds/funds-resource';
import {CustomerResource} from '../resources/customer/customer-resource';
import {CodeBank} from '../resources/code/code-bank';
import {SkillBank} from '../resources/skills/skill-bank';

export class CompanyResourceBank {
   public funds: FundsResource;
   public code: CodeBank;
   public skills: SkillBank;
   public customers: CustomerResource;

   constructor(json: any) {
      this.funds = new FundsResource(json.funds);
      this.code = new CodeBank(json.code);
      this.skills = new SkillBank(json.skills);
      this.customers = new CustomerResource(json.customers);
   }
}
