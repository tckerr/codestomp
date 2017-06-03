import {AchievementCriteriaType} from './achievement-criteria-type.enum';
import {AchievementFeature} from './achievement-feature.enum';
import {Notification} from '../messaging/notification';

export class AchievementBlock {

   public unlocked: boolean;
   public criteriaType: AchievementCriteriaType;
   public unlockWhenValueGte: number;
   public unlocksFeature: AchievementFeature;
   public notification: Notification;

   constructor(json: any) {
      this.unlocked = json.unlocked;
      this.criteriaType = json.criteriaType;
      this.unlockWhenValueGte = json.unlockWhenValueGte;
      this.unlocksFeature = json.unlocksFeature;
      this.notification = new Notification(json.notification);
   }

}
