import {AchievementBlock} from './achievement-block';

export class AchievementTrack {
   public id: string;
   public displayName: string;
   public unlocked: boolean;
   public blocks: AchievementBlock[] = [];

   constructor(json: any) {
      this.id = json.id;
      this.unlocked = json.unlocked;
      this.displayName = json.displayName;
      json.blocks
         .forEach(b => this.blocks.push(new AchievementBlock(b, this)));
   }
}
