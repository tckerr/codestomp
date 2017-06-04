import {TickService} from '../../../../time/tick.service';

export interface ITickSubscriber {
   subscribe(tickService: TickService);
   unsubscribe(): void;
}
