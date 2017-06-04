import {Component, OnDestroy, OnInit} from '@angular/core';
import {TickService} from '../../../../time/tick.service';
import {LoggerService} from '../../../../logging/logger-service';
import * as Enumerable from 'linq';
import {Subscription} from 'rxjs/Subscription';

@Component({
   selector: 'app-ticker-speed',
   templateUrl: './ticker-speed.component.html',
   styleUrls: ['./ticker-speed.component.css']
})
export class TickerSpeedComponent implements OnInit, OnDestroy {
   ngOnDestroy(): void {
      if (this.sub)
         this.sub.unsubscribe()
   }

   private averageOverlap: number = 0;
   private sub: Subscription;

   constructor(private tickService: TickService,
               private logger: LoggerService) {
   }

   ngOnInit() {
      this.sub = this.tickService.pipeline
         .map(t => t.msOverlap)
         .bufferCount(20)
         .map(x => Enumerable.from(x).average())
         .subscribe(average => this.averageOverlap = average);
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

   private resetSpeed(): void {
      this.tickService.resetSpeed();
      this.logger.gameLog(`Resetting speed to ${this.tickService.speed}`);
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
