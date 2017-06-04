import {Component, OnInit} from '@angular/core';
import {TickService} from '../../../../../time/tick.service';
import {Subscription} from 'rxjs/Subscription';
import * as moment from 'moment';
import {ConfigurationService} from '../../../../../configuration/configuration.service';

@Component({
   selector: 'app-date-digest',
   templateUrl: './date-digest.component.html',
   styleUrls: ['./date-digest.component.css']
})
export class DateDigestComponent implements OnInit {
   private tickerSub: Subscription;
   private latestTickDate: moment.Moment;

   constructor(private tickService: TickService, config: ConfigurationService) {
      this.latestTickDate = moment(config.INITIAL_GAME_DATE);
   }

   ngOnInit() {
      this.tickerSub = this.tickService.pipeline.subscribe(tick => {
         this.latestTickDate = tick.date;
      })
   }

   ngOnDestroy(): void {
      this.tickerSub && this.tickerSub.unsubscribe();
   }

   private get latestTickDateHeader() {
      return this.latestTickDate.format('MMMM Do, YYYY');
   }

   private get latestTickDateTime() {
      return this.latestTickDate.format('hh:mm a');
   }

   private get dayPercent() {
      var mmtMidnight = this.latestTickDate.clone().startOf('day');
      return this.latestTickDate.diff(mmtMidnight, 'seconds') / 86400 * 100 + '%';
   }

   private get isDay() {
      var mmtMidnight = this.latestTickDate.clone().startOf('day').add(8, 'hours');
      let diff = this.latestTickDate.diff(mmtMidnight, 'hours');
      return diff >= 0 && diff <= 9;
   }
}
