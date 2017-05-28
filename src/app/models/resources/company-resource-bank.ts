import {FundsResource} from './funds-resource';
import {CustomerResource} from './customer-resource';
import {CodeBank} from './code-bank';

export class CompanyResourceBank {
   public funds: FundsResource;
   public code: CodeBank;
   public customers: CustomerResource;

   constructor(json: any) {
      this.funds = new FundsResource(json.funds);
      this.code = new CodeBank(json.code);
      this.customers = new CustomerResource(json.customers);
   }
}
