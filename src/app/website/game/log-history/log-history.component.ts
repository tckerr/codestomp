import {Component, OnDestroy, OnInit} from '@angular/core';
import {LoggerService} from '../../../services/logger-service';
import {LogItem} from '../../../models/logging/log-item';
import {Subscription} from 'rxjs/Subscription';
import {GameStorageService} from '../../../services/game-storage.service';

@Component({
   selector: 'app-log-history',
   templateUrl: './log-history.component.html',
   styleUrls: ['./log-history.component.css']
})
export class LogHistoryComponent implements OnInit, OnDestroy {
   private logs: LogItem[] = [];
   private logSub: Subscription;
   private saveSub: Subscription;

   constructor(private logger: LoggerService, private gameStorage: GameStorageService) {
      this.logSub = this.logger.gamePipeline.subscribe(l => this.saveLog(l));
      this.saveSub = this.gameStorage.loadedPipeline.subscribe(() => this.logs = []);
   }

   private saveLog(l) {
      this.logs.push(l);
      if(this.logs.length > 100){
         this.logs = this.logs.slice(40, this.logs.length);
      }
   }

   ngOnInit() {

   }

   ngOnDestroy(): void {
      this.logSub.unsubscribe();
      this.saveSub.unsubscribe();
   }

}
