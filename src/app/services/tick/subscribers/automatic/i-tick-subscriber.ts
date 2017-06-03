import {TickService} from '../../tick.service';

export interface ITickSubscriber {
   subscribe(tickService: TickService);
   unsubscribe(): void;
}
