import { Injectable } from '@angular/core';
import {AchievementBlock} from '../../models/achievements/achievement-block';
import {AchievementFeature} from '../../models/achievements/achievement-feature.enum';
import {UnlocksService} from '../unlocks.service';

@Injectable()
export class AchievementUnlockerService {

  constructor(
     private unlocksService: UnlocksService
  ) { }

  public unlock(block: AchievementBlock){
     block.unlocked = true;
     let newTier = this.resolveUnlock(block.unlocksFeature);

  }

  private resolveUnlock(feature: AchievementFeature){
     switch (feature){
        case AchievementFeature.ManualTesting:
           return ++this.unlocksService.unlocks.manualTesting;
     }
  }

}
