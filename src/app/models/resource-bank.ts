import {FundsResource} from './resources/funds-resource';
import {CustomerResource} from './resources/customer-resource';
import {CodeBank} from './resources/code-bank';

export class ResourceBank {
   public funds: FundsResource;
   public code: CodeBank;
   public customers: CustomerResource;

   constructor(json: any) {
      this.funds = new FundsResource(json.funds);
      this.code = new CodeBank(json.code);
      this.customers = new CustomerResource(json.customers);
   }
}
