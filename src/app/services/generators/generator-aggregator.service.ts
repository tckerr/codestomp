import { Injectable } from '@angular/core';
import {TalentGeneratorService} from './talent-generator-service';
import {SpecialEventGeneratorService} from './special-events/special-event-generator.service';
import {IGenerator} from './igenerator';

@Injectable()
export class GeneratorAggregatorService implements IGenerator {

   private generators: IGenerator[] = [];

  constructor(
     talentGeneratorService: TalentGeneratorService,
     specialEventGeneratorService: SpecialEventGeneratorService,
  ) {
     this.generators = [
        talentGeneratorService,
        specialEventGeneratorService
     ]
  }

  public generate(){
     this.generators.forEach(g => g.generate());
  }

}
