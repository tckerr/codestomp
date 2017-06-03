import {IResource} from '../iresource';
import {ResourceBase} from '../resource-base';

export class FundsResource extends ResourceBase implements IResource {
   canBeNegative = true;
   constructor(json: any) {
      super(json);
   }
}
