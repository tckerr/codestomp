import {CodeResource} from './code-resource';

export class CodeBank {
   public pushed: CodeResource;
   public deploying: CodeResource;
   public prod: CodeResource;

   constructor(json: any){
      this.pushed = new CodeResource(json.pushed);
      this.deploying = new CodeResource(json.deploying);
      this.prod = new CodeResource(json.prod);
   }
}
