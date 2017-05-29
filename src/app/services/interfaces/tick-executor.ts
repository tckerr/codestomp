import {Tick} from '../../models/tick';
export interface TickExecutor {
   execute(tick: Tick);
}
