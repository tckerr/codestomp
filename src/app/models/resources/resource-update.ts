import {IResource} from './iresource';

export class ResourceUpdate {
   constructor(public oldVal: number,
               public newVal: number,
               public totalAccumulated: number,
               public delta: number,
               public resource: IResource) {
   }
}
