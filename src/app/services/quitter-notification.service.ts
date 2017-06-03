import {Injectable} from '@angular/core';
import {Subject} from 'rxjs/Subject';
import {LoggerService} from './logger-service';
import {LogType} from '../models/definitions/log-type';

@Injectable()
export class QuitterNotificationService {

   private source = new Subject<[string, string]>();
   public pipeline = this.source.asObservable();

   constructor(private logger: LoggerService) {
   }

   public newQuitter(quitter: string = "An employee", reason: string = "poor work conditions"){
      let message = `${quitter} has quit due to ${reason}!`;
      this.source.next([quitter, reason]);
      this.logger.gameLog(message, LogType.Error);
   }

}
