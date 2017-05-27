import {Component, OnDestroy, OnInit} from '@angular/core';
import {TickService} from '../../services/tick/tick.service';
import {GameStorageService} from '../../services/game-storage.service';
import {ActivatedRoute} from '@angular/router';
import {Subscription} from 'rxjs/Subscription';

@Component({
   selector: 'app-game',
   templateUrl: './game.component.html',
   styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit, OnDestroy {
   private routeParamsSubscription: Subscription;
   private gameId: string;

   constructor(private tickService: TickService,
               private gameStorageService: GameStorageService,
               private route: ActivatedRoute) {
   }

   ngOnInit() {
      this.routeParamsSubscription = this.route.params.subscribe(params => {
         this.gameId = params['id'];
         this.onGameLoad();
      });
   }

   private onGameLoad() {
      this.gameStorageService.load(this.gameId);
      this.tickService.start();
   }

   ngOnDestroy() {
      this.routeParamsSubscription.unsubscribe();
   }

}
