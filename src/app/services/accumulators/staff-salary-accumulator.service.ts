import {Injectable, OnDestroy} from '@angular/core';
import {Subscription} from 'rxjs/Subscription';
import {DeveloperStaffService} from '../resource-services/developer-staff.service';
import {TickService} from '../tick/tick.service';
import {Tick} from '../../models/tick';
import {FundService} from '../resource-services/fund.service';
import {Staff} from '../../models/business-units/staff';
import {IAccumulator} from 'app/services/accumulators/iaccumulator';
import {GameStorageService} from "../game-storage.service";
import {perHour} from "../../../environments/environment";
import * as Enumerable from "linq";

@Injectable()
export class StaffSalaryAccumulatorService implements OnDestroy, IAccumulator {

   private sub: Subscription;

   constructor(private developerStaff: DeveloperStaffService,
               private fundService: FundService,
               private gameStorage: GameStorageService,
               private tickService: TickService) {
   }

   ngOnDestroy(): void {
      this.sub && this.sub.unsubscribe();
   }

   public start() {
      this.sub = this.tickService.pipeline.subscribe((tick: Tick) => {
         let costs = this.salaryCostsForElapsedMs(tick.msElapsed);
         let surplus = this.fundService.funds.remove(costs);
         if (surplus < 0)
            this.developerStaff.chanceRandomQuit(tick.msElapsed);
         //TODO: all staff types can quit
         // possibly, can quit for other reasons, but we don't want
         // the chance to be multiplied by the number of reasons?
         // if not, we need to aggregate them somewhere
      });
   }

   public get costsPerHour() {
      return this.salaryCostsForElapsedMs(perHour);
   }

   private salaryCostsForElapsedMs(ms: number) {
      let salaryCostsPerMs = Enumerable
         .from(this.gameStorage.game.company.businessUnits)
         .selectMany(bu => bu.staff)
         .sum(staff => staff.hired * staff.baseSalaryPerMs);
      return salaryCostsPerMs * ms;
   }
}
