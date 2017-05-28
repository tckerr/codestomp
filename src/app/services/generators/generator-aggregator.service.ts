import { Injectable } from '@angular/core';
import {GraduateDeveloperGeneratorService} from './graduate-developer-generator.service';

@Injectable()
export class GeneratorAggregatorService {

  constructor(private graduateDeveloperGenerator: GraduateDeveloperGeneratorService) { }

  public start(){
     this.graduateDeveloperGenerator.start();
  }

}
