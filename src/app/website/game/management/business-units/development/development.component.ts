import {Component, OnDestroy, OnInit} from '@angular/core';
import {GameStorageService} from '../../../../../services/game-storage.service';
import {Subscription} from 'rxjs/Subscription';
import {BusinessUnits} from '../../../../../models/business-units/business-units.enum';
import {DevelopmentBusinessUnit} from '../../../../../models/business-units/development-business-unit';
import {ConfigurationService} from '../../../../../services/configuration.service';

@Component({
   selector: 'app-development',
   templateUrl: './development.component.html',
   styleUrls: ['./development.component.css']
})
export class DevelopmentComponent implements OnInit, OnDestroy {
   private routeParamsSubscription: Subscription;

   constructor(private gameStorageService: GameStorageService,
               private config: ConfigurationService) {
   }

   ngOnInit() {
   }

   ngOnDestroy(): void {
      this.routeParamsSubscription && this.routeParamsSubscription.unsubscribe();
   }

   private get businessUnit(): DevelopmentBusinessUnit {
      let businessUnits = this.gameStorageService.game.company.businessUnits;
      for (let i = 0; i < businessUnits.length; ++i) {
         if (businessUnits[i].id == BusinessUnits.Development)
            return (<DevelopmentBusinessUnit>businessUnits[i]);
      }
      throw Error('Business unit not found!');
   }

}
