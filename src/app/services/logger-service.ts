import {Injectable} from '@angular/core';
import {LogItem} from '../models/logging/log-item';
import {IdGeneratorService} from './id-generator.service';
import {Subject} from 'rxjs/Subject';

@Injectable()
export class LoggerService {

   private source = new Subject<LogItem>();
   private gameSource = new Subject<LogItem>();
   public pipeline = this.source.asObservable();
   public gamePipeline = this.gameSource.asObservable();

   constructor(private idGeneratorService: IdGeneratorService) {
      this.pipeline.subscribe(l => console.log.apply(console, l.args))
   }

   public log(...args: any[]): void {
      let id = this.idGeneratorService.generate();
      this.source.next(new LogItem(id, args));
   }

   public gameLog(...args: any[]): void {
      let id = this.idGeneratorService.generate();
      let logItem = new LogItem(id, args);
      this.source.next(logItem);
      this.gameSource.next(logItem);
   }

}
