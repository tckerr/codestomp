import {Injectable} from '@angular/core';
import {LogItem} from '../models/logging/log-item';
import {IdGeneratorService} from './id-generator.service';
import {Subject} from 'rxjs/Subject';
import {LogType} from '../models/definitions/log-type';

@Injectable()
export class LoggerService {

   private gameSource = new Subject<LogItem>();
   public gamePipeline = this.gameSource.asObservable();

   constructor(private idGeneratorService: IdGeneratorService) {
   }

   public log(...args: any[]): void {
      let id = this.idGeneratorService.generate();
      console.log.apply(console, args);
   }

   public gameLog(message: string, logType: LogType = LogType.Trace): void {
      let id = this.idGeneratorService.generate();
      let logItem = new LogItem(id, message, logType);
      this.gameSource.next(logItem);
   }

}
