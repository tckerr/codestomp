import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {GameStorageService} from '../../../services/game-storage.service';
import {Router} from '@angular/router';
import {environment} from '../../../../environments/environment';

@Component({
   selector: 'app-game-state',
   templateUrl: './game-state.component.html',
   styleUrls: ['./game-state.component.css']
})
export class GameStateComponent implements OnInit {

   private gameId: string;
   @Output() private gameSaved = new EventEmitter<string>();
   private selectedGameId: string;
   private askBeforeClear: boolean;

   constructor(private gameStorageService: GameStorageService,
               private router: Router) {
      this.askBeforeClear = environment.gameSettings.askBeforeClear;
   }

   ngOnInit() {
      this.gameId = this.gameStorageService.game.id;
      this.loadGame(this.gameId);
      this.selectedGameId = this.gameId;
   }

   private loadGame(gameId: string) {
      if (!this.gameStorageService.verify(gameId)) {
         alert('Error, game does not exist!');
         return;
      }
      if (gameId != this.gameId)
         this.router.navigate([`/game/${gameId}`]);
      else
         this.gameStorageService.load(gameId);
   }

   private save(): void {
      this.gameStorageService.save();
      this.gameSaved.emit(this.gameId);
   }

   private clear(): void {
      if (!this.askBeforeClear || confirm('Are you sure you want to clear all data?'))
         this.gameStorageService.clear();
   }

}
