import {ResourceBase} from './resource-base';
import {IResource} from './iresource';

export class HiringCandidatePoolResource extends ResourceBase implements IResource {
   constructor(json: any){
      super(json);
   }
}
