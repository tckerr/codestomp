import {Injectable} from '@angular/core';
import {GameStorageService} from '../persistence/game-storage.service';
import * as Enumerable from 'linq';
import {IEnumerable} from 'linq';
import {AchievementBlock} from '../../models/achievements/achievement-block';

@Injectable()
export class AchievementsService {

   constructor(private gameStorageService: GameStorageService) {
   }

   public get tracks() {
      return this.gameStorageService.game.achievementTracks;
   }

   public track(id: string) {
      let track = Enumerable
         .from(this.gameStorageService.game.achievementTracks)
         .first(t => t.id === id);
      if (!track)
         throw Error(`Track not found: ${id}`);
      return track;
   }

   public get pending(): IEnumerable<AchievementBlock> {
      return Enumerable
         .from(this.tracks)
         .where(t => t.unlocked)
         .selectMany(t =>
            Enumerable
               .from(t.blocks)
               .where(t => !t.unlocked)
               .take(1));
   }

}
