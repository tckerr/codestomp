import {AchievementCriteriaType} from './achievement-criteria-type.enum';
import {UnlockableFeature} from './unlockable-feature.enum';
import {Notification} from '../messaging/notification';
import {AchievementTrack} from './achievement-track';

export class AchievementBlock {

   public unlocked: boolean;
   public $track: AchievementTrack;
   public criteriaType: AchievementCriteriaType;
   public unlockWhenValueGte: number;
   public unlocksFeature: UnlockableFeature;
   public baseline: number;
   public triggersTrack: string;
   public notification: Notification;
   public cumulative: boolean = false;
   public displayName: string;

   constructor(json: any, track: AchievementTrack) {
      this.$track = track;
      this.unlocked = json.unlocked;
      this.baseline = json.baseline;
      this.triggersTrack = json.triggersTrack;
      this.criteriaType = json.criteriaType;
      this.cumulative = json.cumulative || false;
      this.unlockWhenValueGte = json.unlockWhenValueGte;
      this.unlocksFeature = json.unlocksFeature;
      this.displayName = json.displayName;
      this.notification = new Notification(json.notification);
   }

}
