import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CommitGeneratorService} from './commit-generator.service';
import {IdGeneratorService} from './id-generator.service';
import {EnumParserService} from './enum-parser.service';

@NgModule({
   imports: [
      CommonModule
   ],
   declarations: [],
   providers: [
      CommitGeneratorService,
      IdGeneratorService,
      EnumParserService
   ]
})
export class UtilitiesModule {
}
