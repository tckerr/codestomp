import {Injectable} from '@angular/core';
import {GameStorageService} from '../game-storage.service';
import {LoggerService} from '../logger-service';
import {CommitGeneratorService} from '../../commit-generator.service';
import {ConfigurationService} from '../configuration.service';

@Injectable()
export class CodeService {

   constructor(private gameStorageService: GameStorageService,
               private config: ConfigurationService) {
   }

   public write(count: number = 1): void {
      this.code.pushed.add(count);
   }

   public test(count: number = 1): void {
      this.movePushedToTested(count);
   }

   public movePushedToTested(count: number) {
      let amount = Math.min(count, this.code.pushed.balance);
      this.code.tested.add(amount);
      this.code.pushed.remove(amount);
      return amount;
   }

   public moveTestedToDeploying(count: number) {
      let amount = Math.min(count, this.code.tested.balance);
      this.code.deploying.add(amount);
      this.code.tested.remove(amount);
      return amount;
   }

   public resetDeployment() {
      let lines = this.code.deploying.balance;
      this.code.deploying.remove(lines);
      this.code.tested.add(lines);
      return lines;
   }

   public moveDeployingToDeployed(count: number) {
      let bugs = this.config.bugsPercentage * count;
      this.code.prod.add(count - bugs);
      this.code.bugs.add(bugs);
      this.code.deploying.remove(count);
      return count;
   }

   public get code() {
      return this.gameStorageService.game.company.resources.code;
   }

   public get pushed() {
      return this.code.pushed;
   }

   public get tested() {
      return this.code.tested;
   }

   public get deploying() {
      return this.code.deploying;
   }

   public get prod() {
      return this.code.prod;
   }

   public get bugs() {
      return this.code.bugs;
   }

   public get total() {
      return this.prod.balance + this.deploying.balance + this.pushed.balance + this.tested.balance + this.bugs.balance;
   }

}
