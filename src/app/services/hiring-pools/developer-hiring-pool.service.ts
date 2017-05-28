import {Injectable, OnDestroy} from '@angular/core';
import {Developer} from '../../models/developer';
import {GraduateDeveloperGeneratorService} from '../generators/graduate-developer-generator.service';
import {Subscription} from 'rxjs/Subscription';
import {LoggerService} from '../logger-service';

@Injectable()
export class DeveloperHiringPoolService implements OnDestroy {

   constructor(private graduateDeveloperGeneratorService: GraduateDeveloperGeneratorService,
               private logger: LoggerService) {
   }

   private sub: Subscription;
   public pool: Developer[] = [];
   public maxSize: number = 5; // TODO: config

   public get hasRoom() {
      return this.pool.length < this.maxSize;
   }

   public add(dev: Developer) {
      if (!this.hasRoom)
         throw Error('Out of room, can\'t add a dev!');
      this.pool.push(dev);
   }

   public listen() {
      this.sub = this.graduateDeveloperGeneratorService
         .pipeline.subscribe(d => this.acceptDeveloper(d))
   }

   private acceptDeveloper(dev: Developer) {
      if (this.hasRoom) {
         this.add(dev);
         this.logger.gameLog(`A new developer joined the job market: '${dev.name}'`)
      }
   }

   ngOnDestroy(): void {
      throw new Error('Method not implemented.');
   }

}
