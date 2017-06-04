import {Injectable} from '@angular/core';
import {GameStorageService} from '../../persistence/game-storage.service';
import * as Enumerable from 'linq';
import {IEnumerable} from 'linq';
import {AchievementBlock} from '../../models/achievements/achievement-block';
import {AchievementTrack} from '../../models/achievements/achievement-track';

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

   public pendingForId(id: string): AchievementBlock {
      let tracks = this.unlockedTracks
         .where(track => track.id === id)
         .selectMany(track => this.firstUnlockedBlockForEach(track))
         .take(1);
      return tracks.any() ? tracks.first() : null;
   }

   public get pending(): IEnumerable<AchievementBlock> {
      return this
         .unlockedTracks
         .selectMany(track => this.firstUnlockedBlockForEach(track));
   }

   private firstUnlockedBlockForEach(track: AchievementTrack) {
      return Enumerable
         .from(track.blocks)
         .where(block => !block.unlocked)
         .take(1);
   };

   private get unlockedTracks(): IEnumerable<AchievementTrack> {
      return Enumerable
         .from(this.tracks)
         .where(t => t.unlocked);
   }

}
