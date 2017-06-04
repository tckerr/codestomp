import {Injectable} from '@angular/core';
import {UnlocksService} from '../achievements/unlocks.service';
import {IListener} from './i-listener';
import {ListenerBase} from './listener-base';
import {Subscription} from 'rxjs/Subscription';
import {UnlockableFeature} from '../../models/achievements/unlockable-feature.enum';
import {GameStorageService} from '../../persistence/game-storage.service';

@Injectable()
export class BusinessUnitUnlockListenerService extends ListenerBase implements IListener {

   constructor(private unlocksService: UnlocksService,
               private gameStorageService: GameStorageService,) {
      super();
   }

   protected getSubscriptions(): Subscription[] {
      let sub = this.unlocksService.pipeline
         .subscribe((feature: UnlockableFeature) => this.handleUnlock(feature));
      return [sub];
   }

   private handleUnlock(feature: UnlockableFeature) {
      switch (feature) {
         case UnlockableFeature.Incorporation:
            return this.unlockCorporate();
         default:
            return;
      }
   }

   private unlockCorporate() {
      this.gameStorageService.game.company.businessUnits.corporate.active = true;
   }
}
