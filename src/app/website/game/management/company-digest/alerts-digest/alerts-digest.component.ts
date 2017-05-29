import {Component, OnInit} from '@angular/core';
import {QuitterNotificationService} from '../../../../../services/quitter-notification.service';
import {Subscription} from 'rxjs/Subscription';

@Component({
   selector: 'app-alerts-digest',
   templateUrl: './alerts-digest.component.html',
   styleUrls: ['./alerts-digest.component.css']
})
export class AlertsDigestComponent implements OnInit {
   ngOnInit(): void {
   }
   private quitterSub: Subscription;

   private alerts: any[] = [];

   constructor(private quitters: QuitterNotificationService) {}
}
