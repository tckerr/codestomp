import {Component, OnDestroy, OnInit} from '@angular/core';
import {TickService} from '../../time/tick.service';
import {GameStorageService} from '../../persistence/game-storage.service';
import {ActivatedRoute} from '@angular/router';
import {Subscription} from 'rxjs/Subscription';
import {SubscriptionAggregationService} from '../../game/tick-subscribers/subscription-aggregation.service';

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
               private route: ActivatedRoute,
               private tickSubscriptionAggregationService: SubscriptionAggregationService) {
   }

   ngOnInit() {
      this.gameStorageService.loadedPipeline.subscribe(() => this.onGameLoad());
      this.routeParamsSubscription = this.route.params.subscribe(params => {
         this.gameId = params['gameId'];
         this.gameStorageService.load(this.gameId);
      });
   }

   private onGameLoad() {
      this.tickService.flush();
      this.tickSubscriptionAggregationService.restart();
      this.tickService.start();
   }

   ngOnDestroy() {
      this.routeParamsSubscription.unsubscribe();
      this.tickSubscriptionAggregationService.stop();
      this.tickService.stop();
   }

}
