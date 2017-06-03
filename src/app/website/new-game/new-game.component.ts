import {Component, OnInit} from '@angular/core';
import {GameStorageService} from '../../services/persistence/game-storage.service';
import {Router} from '@angular/router';

@Component({
   selector: 'app-new-game',
   templateUrl: './new-game.component.html',
   styleUrls: ['./new-game.component.css']
})
export class NewGameComponent implements OnInit {

   constructor(private gameStorageService: GameStorageService, private router: Router) {
   }

   ngOnInit() {
      let gameId = this.gameStorageService.create();
      return this.router.navigate([`/game/${gameId}`])
   }

}
