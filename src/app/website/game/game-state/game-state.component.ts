import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {GameStorageService} from '../../../services/game-storage.service';
import {Router} from '@angular/router';
import {TickService} from '../../../services/tick/tick.service';

@Component({
   selector: 'app-game-state',
   templateUrl: './game-state.component.html',
   styleUrls: ['./game-state.component.css']
})
export class GameStateComponent implements OnInit {

   @Input() gameId: string;
   @Output() private gameSaved = new EventEmitter<string>();
   private selectedGameId: string;

   constructor(private gameStorageService: GameStorageService,
               private tickService: TickService,
               private router: Router) {
   }

   ngOnInit() {
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
      if (confirm('Are you sure you want to clear all data?')) {
         this.gameStorageService.clear();
      }
   }

   private pause(): void {
      this.tickService.stop();
   }

   private resume(): void {
      this.tickService.start();
   }

}
