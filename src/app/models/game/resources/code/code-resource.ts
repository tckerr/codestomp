import {IResource} from '../iresource';
import {ResourceBase} from '../resource-base';

export class CodeResource extends ResourceBase implements IResource {
   constructor(json: any) {
      super(json);
   }
}
