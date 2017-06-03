import {AchievementCriteriaType} from './achievement-criteria-type.enum';
import {UnlockableFeature} from './unlockable-feature.enum';
import {Notification} from '../messaging/notification';

export class AchievementBlock {

   public unlocked: boolean;
   public criteriaType: AchievementCriteriaType;
   public unlockWhenValueGte: number;
   public unlocksFeature: UnlockableFeature;
   public notification: Notification;
   public displayName: string = "the next achievement";

   constructor(json: any) {
      this.unlocked = json.unlocked;
      this.criteriaType = json.criteriaType;
      this.unlockWhenValueGte = json.unlockWhenValueGte;
      this.unlocksFeature = json.unlocksFeature;
      this.displayName = json.displayName;
      this.notification = new Notification(json.notification);
   }

}
