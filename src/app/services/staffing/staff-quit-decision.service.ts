import {Injectable} from '@angular/core';
import {QuitterNotificationService} from '../notifications/quitter-notification.service';
import {ConfigurationService} from '../config/configuration.service';
import {PaymentObligationResult} from '../tick/subscribers/automatic/accumulators/staff-salary-accumulator.service';

@Injectable()
export class StaffQuitDecisionService {

   constructor(private quitterNotificationService: QuitterNotificationService,
               private config: ConfigurationService,) {
   }

   public decide(ms: number, paymentObligationResult: PaymentObligationResult) {
      // we offset on ms so that longer intervals have more chance for quit

      if (Math.random() > (ms * this.config.quitChanceOnLackOfPayment))
         return;
      let deficitPct = paymentObligationResult.deficitPercent;
      if (Math.random() > deficitPct)
         return;

      let staff = paymentObligationResult.obligation.staff;
      staff.hired--;
      this.quitterNotificationService.newQuitter(`One ${staff.displayName}`, 'lack of payment');
   }

}
