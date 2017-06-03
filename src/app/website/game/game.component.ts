import {Component, OnDestroy, OnInit} from '@angular/core';
import {TickService} from '../../services/tick/tick.service';
import {GameStorageService} from '../../services/persistence/game-storage.service';
import {ActivatedRoute} from '@angular/router';
import {Subscription} from 'rxjs/Subscription';
import {CodeService} from '../../services/resource-services/code.service';
import {TickSubscriptionAggregationService} from '../../services/tick/subscribers/automatic/tick-subscription-aggregation.service';
import {NotificationService} from '../../services/notifications/notification.service';

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
               private codeService: CodeService,
               private tickSubscriptionAggregationService: TickSubscriptionAggregationService) {
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
      this.codeService.resetDeployment(); // TODO: fix this by making all deployment info stored and resumable
      this.tickSubscriptionAggregationService.restart();
      this.tickService.start();
   }

   ngOnDestroy() {
      this.routeParamsSubscription.unsubscribe();
      this.tickSubscriptionAggregationService.stop();
      this.tickService.stop();
   }

}
