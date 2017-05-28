import { Injectable } from '@angular/core';
import {GameStorageService} from '../game-storage.service';
import {LoggerService} from '../logger-service';
import {CommitGeneratorService} from '../../commit-generator.service';

@Injectable()
export class CodeService {

  constructor(private gameStorageService: GameStorageService,
              private commitGeneratorService: CommitGeneratorService,
              private logger: LoggerService) { }

  public write(count: number = 1): void {
     //this.logger.gameLog(`Wrote ${count} lines of code`);
     this.logger.gameLog(this.commitGeneratorService
        .generate())
     this.gameStorageService.game.company.resources.code.pushed.add(count);
  }

  public movePushedToDeploying(){
     let lines = this.code.pushed.balance;
     this.code.deploying.add(lines);
     this.code.pushed.remove(lines);
     return lines;
  }

  public resetDeployment(){
     let lines = this.code.deploying.balance;
     this.code.deploying.remove(lines);
     this.code.pushed.add(lines);
     return lines;
  }

  public moveDeployingToDeployed(count: number){
     this.code.prod.add(count);
     this.code.deploying.remove(count);
     return count;
  }

  public get code(){
     return this.gameStorageService.game.company.resources.code;
  }

  public get prod(){
     return this.code.prod;
  }

  public get deploying(){
     return this.code.deploying;
  }

  public get pushed(){
     return this.code.pushed;
  }

  public get total(){
     return this.prod.balance + this.deploying.balance + this.pushed.balance;
  }

}
