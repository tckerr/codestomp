import {Component, OnInit} from '@angular/core';
import {TickService} from '../../../../services/tick/tick.service';
import {LoggerService} from '../../../../services/logger-service';

@Component({
   selector: 'app-ticker-speed',
   templateUrl: './ticker-speed.component.html',
   styleUrls: ['./ticker-speed.component.css']
})
export class TickerSpeedComponent implements OnInit {

   constructor(private tickService: TickService,
               private logger: LoggerService) {
   }

   ngOnInit() {
   }

   private pause(): void {
      this.tickService.stop();
      this.logger.gameLog('Paused...');
   }

   private resume(): void {
      this.tickService.start();
      this.logger.gameLog('Resumed!');
   }

   private increaseSpeed(): void {
      this.tickService.faster();
      this.logger.gameLog(`Speeding up to ${this.tickService.speed} ticks/s`);
   }

   private decreaseSpeed(): void {
      this.tickService.slower();
      this.logger.gameLog(`Slowing down to ${this.tickService.speed} ticks/s`);
   }

}
