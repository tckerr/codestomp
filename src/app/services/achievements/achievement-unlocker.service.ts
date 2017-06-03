import { Injectable } from '@angular/core';
import {AchievementBlock} from '../../models/achievements/achievement-block';
import {UnlockableFeature} from '../../models/achievements/unlockable-feature.enum';
import {UnlocksService} from '../unlocks.service';
import {GameStorageService} from '../persistence/game-storage.service';
import {NotificationService} from '../notifications/notification.service';

@Injectable()
export class AchievementUnlockerService {

  constructor(
     private gameStorageService: GameStorageService,
     private notificationService: NotificationService,
     private unlocksService: UnlocksService
  ) { }

  public unlock(block: AchievementBlock){
     block.unlocked = true;
     let newlyUnlocked = this.resolveUnlock(block.unlocksFeature);
     if (newlyUnlocked){
        this.notificationService.send(block.notification);
     } else {
        throw Error("Achievement already unlocked!");
     }
  }

  private resolveUnlock(feature: UnlockableFeature){
     let alreadyUnlocked = this.unlocksService.isUnlocked(feature);
     this.unlocksService.unlock(feature);
     return !alreadyUnlocked;
  }

}
