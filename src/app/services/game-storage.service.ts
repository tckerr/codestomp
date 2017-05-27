import {Injectable} from '@angular/core';
import {Game} from '../models/game';
import {environment} from '../../environments/environment';
import {IdGeneratorService} from './id-generator.service';
import {LoggerService} from './logger-service';
import {Subject} from 'rxjs/Subject';
import {BusinessUnits} from '../models/business-units/business-units.enum';

@Injectable()
export class GameStorageService {
   // TODO: only expose thru API?
   public game: Game;
   private loadedSource = new Subject();
   public loadedPipeline = this.loadedSource.asObservable();

   constructor(private idGeneratorService: IdGeneratorService,
               private logger: LoggerService) {
   }

   load(gameId: string) {
      let gameData = localStorage.getItem(gameId);
      if (!gameData)
         throw Error(`Game does not exist: ${gameId}`);
      this.game = new Game(JSON.parse(gameData));
      this.loadedSource.next();
      this.logger.log('Loaded', this.game);
   }

   public verify(gameId: string) {
      let gameData = localStorage.getItem(gameId);
      if (!gameData)
         return false;
      return true;
   }

   public create() {
      let seed = this.defaultSeed();
      this.game = new Game(seed);
      this.save();
      return this.game.id;
   }

   public save() {
      this.logger.gameLog('Saving...', this.game.id);
      localStorage.setItem(this.game.id, JSON.stringify(this.game));
   }

   public clear() {
      this.logger.gameLog('Clearing all data...');
      localStorage.clear();
   }

   private defaultSeed(): any {
      return {
         id: 'csgm_' + this.idGeneratorService.generate(),
         tick: 0,
         company: {
            name: environment.gameSettings.defaults.companyName,
            businessUnits: [
               {
                  id: BusinessUnits.HR,
                  name: 'Human Resources',
                  active: false
               },
               {
                  id: BusinessUnits.Development,
                  name: 'Development',
                  active: true,
                  spacesVsTabs: 'spaces'
               }
            ]
         }
      }
   }
}
