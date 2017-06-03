import {Subscription} from 'rxjs/Subscription';

export class TickSubscriberBase {
   protected tickerSubscription: Subscription;

   public unsubscribe() {
      if (this.tickerSubscription) {
         this.tickerSubscription.unsubscribe();
      }
   }
}
