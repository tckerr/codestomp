import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs/Subscription';
import {UnlocksService} from '../../../../../services/unlocks.service';

@Component({
   selector: 'app-development',
   templateUrl: './development.component.html',
   styleUrls: ['./development.component.css']
})
export class DevelopmentComponent implements OnInit, OnDestroy {
   private routeParamsSubscription: Subscription;

   constructor(
      private unlocksService: UnlocksService,
   ) {}

   ngOnInit() { }

   ngOnDestroy(): void {
      if (this.routeParamsSubscription)
         this.routeParamsSubscription.unsubscribe();
   }

   public devHiringUnlocked(){
      return this.unlocksService.unlocks.hiring.development;
   }

}
