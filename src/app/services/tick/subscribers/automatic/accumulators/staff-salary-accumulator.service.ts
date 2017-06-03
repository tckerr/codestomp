import {Injectable, OnDestroy} from '@angular/core';
import {Subscription} from 'rxjs/Subscription';
import {TickService} from '../../../tick.service';
import {Tick} from '../../../../../models/tick/tick';
import {FundService} from '../../../../resource-services/fund.service';
import {Staff} from '../../../../../models/game/company/business-units/staff';
import {GameStorageService} from '../../../../persistence/game-storage.service';
import {perHour} from '../../../../../../environments/environment';
import * as Enumerable from 'linq';
import {IEnumerable} from 'linq';
import {StaffQuitDecisionService} from '../../../../staffing/staff-quit-decision.service';
import {ITickSubscriber} from '../i-tick-subscriber';
import {TickSubscriberBase} from '../tick-subscriber-base';

export class PaymentObligationResult {
   constructor(public obligation: PaymentObligation,
               public deficit: number) {
   }

   public get deficitPercent() {
      return this.deficit / this.obligation.amount;
   }
}

export class PaymentObligation {
   constructor(public amount: number,
               public staff: Staff,) {
   };
}

@Injectable()
export class StaffSalaryAccumulatorService extends TickSubscriberBase implements ITickSubscriber  {

   constructor(private fundService: FundService,
               private gameStorage: GameStorageService,
               private staffQuitDecisionService: StaffQuitDecisionService,
   ) {
      super();
   }

   public subscribe(tickService: TickService) {
      this.tickerSubscription = tickService.pipeline.subscribe((tick: Tick) => {
         let ms = tick.msElapsed;
         this.paySalariesAndGetFailedObligations(ms)
            .shuffle()
            .forEach(failedObligationResult => this.staffQuitDecisionService.decide(ms, failedObligationResult));
      });
   }

   // TODO: allow payment strategies (i.e. underpaying everyone a lil instead of some people none)
   private paySalariesAndGetFailedObligations(ms: number): IEnumerable<PaymentObligationResult> {
      let results = Enumerable
         .from(this.salaryObligationsForElapsedMs(ms))
         .select(obligation => {
            let delta = this.payObligation(obligation);
            let deficit = obligation.amount + delta;
            return new PaymentObligationResult(obligation, deficit);
         })
         .where(obligationResult => obligationResult.deficit > 0);
      return results;
   }

   private payObligation(obligation: PaymentObligation): number {
      let delta = this.fundService.funds.remove(obligation.amount);
      return delta;
   }

   public get costsPerHour() {
      let obligations = this.salaryObligationsForElapsedMs(perHour);
      return Enumerable.from(obligations).sum(o => o.amount);
   }

   private salaryObligationsForElapsedMs(ms: number): IEnumerable<PaymentObligation> {
      return Enumerable
         .from(this.gameStorage.game.company.businessUnits.$asList())
         .selectMany(bu => bu.staff)
         .select(staff => {
            let salaryCost = staff.hired * staff.baseSalaryPerMs * ms;
            return new PaymentObligation(salaryCost, staff);
         });
   }
}
