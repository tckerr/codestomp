import {Injectable} from '@angular/core';
import {QuitterNotificationService} from '../../quitter-notification.service';
import {PaymentObligationResult} from '../staff-salary-accumulator.service';
import {ConfigurationService} from '../../configuration.service';

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
      if (deficitPct < .1 || Math.random() > deficitPct)
         return;

      let staff = paymentObligationResult.obligation.staff;
      staff.hired--;
      this.quitterNotificationService.newQuitter(`One ${staff.displayName}`, 'lack of payment');
   }

}
