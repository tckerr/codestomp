import {ResourceBase} from '../resource-base';

export class SkillResource extends ResourceBase {
   public level: number;
   public improvementConstant: number;

   constructor(json: any) {
      super(json);
      this.level = json.level;
      this.improvementConstant = json.improvementConstant;
   }
}
