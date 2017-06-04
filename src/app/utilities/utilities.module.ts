import {NgModule} from '@angular/core';
import {CommitGeneratorService} from './commit-generator.service';
import {IdGeneratorService} from './id-generator.service';
import {EnumParserService} from './enum-parser.service';

@NgModule({
   imports: [],
   declarations: [],
   providers: [
      CommitGeneratorService,
      IdGeneratorService,
      EnumParserService
   ]
})
export class UtilitiesModule {
}
