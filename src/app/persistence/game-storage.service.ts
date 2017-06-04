import {Injectable} from '@angular/core';
import {Game} from '../models/game';
import {LoggerService} from '../logging/logger-service';
import {Subject} from 'rxjs/Subject';
import {GameSeedGeneratorService} from './game-seed-generator.service';

@Injectable()
export class GameStorageService {
   // TODO: only expose thru API?
   public game: Game;
   private loadedSource = new Subject();
   public loadedPipeline = this.loadedSource.asObservable();

   constructor(private gameSeedGenerator: GameSeedGeneratorService,
               private logger: LoggerService) {
   }

   load(gameId: string) {
      let gameData = localStorage.getItem(gameId);
      // this.traceLoad(gameData, gameId);
      if (!gameData)
         throw Error(`Game does not exist: ${gameId}`);
      this.game = new Game(JSON.parse(gameData));
      this.loadedSource.next();
   }

   private traceLoad(gameData: string, gameId: string) {
      this.logger.gameLog('Loading... ' + gameId);
      console.group('Loading');
      console.log(gameData);
      console.log(JSON.parse(gameData));
      console.groupEnd();
   }

   private traceSave(game: Game) {
      this.logger.gameLog('Saving...' + this.game.id);
      console.group('Saving');
      console.log(game);
      console.log(this.toJson(game));
      console.groupEnd();
   }

   public verify(gameId: string) {
      let gameData = localStorage.getItem(gameId);
      if (!gameData)
         return false;
      return true;
   }

   public create() {
      let seed = this.gameSeedGenerator.defaultSeed();
      this.game = new Game(seed);
      this.save();
      return this.game.id;
   }

   public save() {
      this.traceSave(this.game);
      localStorage.setItem(this.game.id, this.toJson(this.game));
   }

   private toJson(game: Game) {
      return JSON.stringify(game, (k, v) => {
         if (k.indexOf('$') >= 0)
            return undefined;
         return v;
      });
   }

   public clear() {
      this.logger.gameLog('Clearing all data...');
      localStorage.clear();
   }

}
