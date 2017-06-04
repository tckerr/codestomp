import {SkillResource} from './skill-resource';

export class SkillBank {

   public coding: SkillResource;
   public testing: SkillResource;
   public deploying: SkillResource;
   public bugFixing: SkillResource;

   constructor(json: any) {
      this.coding = new SkillResource(json.coding);
      this.testing = new SkillResource(json.testing);
      this.deploying = new SkillResource(json.deploying);
      this.bugFixing = new SkillResource(json.bugFixing);
   }

}
