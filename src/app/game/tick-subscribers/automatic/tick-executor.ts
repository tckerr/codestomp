import {Tick} from '../../../models/tick/tick';
export interface TickExecutor {
   execute(tick: Tick);
}
