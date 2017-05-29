import { Injectable } from '@angular/core';
import {TalentGeneratorService} from './talent-generator-service';

@Injectable()
export class GeneratorAggregatorService {

  constructor(private jobMarketCandidateGeneratorService: TalentGeneratorService) { }

  public start(){
     this.jobMarketCandidateGeneratorService.start();
  }

}
