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
      this.logger.gameLog('Paused...');
      this.tickService.stop();
   }

   private step(): void {
      this.logger.gameLog('Stepping forward...');
      this.tickService.step();
   }

   private resume(): void {
      this.logger.gameLog('Resumed!');
      this.tickService.start();
   }

   private increaseSpeed(): void {
      this.tickService.faster();
      this.logger.gameLog(`Speeding up to ${this.tickService.speed}`);
   }

   private decreaseSpeed(): void {
      this.tickService.slower();
      this.logger.gameLog(`Slowing down to ${this.tickService.speed}`);
   }

   private increaseTps(): void {
      this.tickService.increaseTps();
      this.logger.gameLog(`Increasing resolution to ${this.tickService.tps} ticks/s`);
   }

   private decreaseTps(): void {
      this.tickService.decreaseTps();
      this.logger.gameLog(`Slowing down to ${this.tickService.tps} ticks/s`);
   }

}
