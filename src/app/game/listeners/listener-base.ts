import {IListener} from './i-listener';
import {Subscription} from 'rxjs/Subscription';

export abstract class ListenerBase implements IListener {

   private subscriptions: Subscription[] = [];

   public subscribe(): void {
      this.subscriptions = this.getSubscriptions();
   }

   public unsubscribe() {
      this.subscriptions.forEach(s => s.unsubscribe());
   }

   protected abstract getSubscriptions(): Subscription[];
}
