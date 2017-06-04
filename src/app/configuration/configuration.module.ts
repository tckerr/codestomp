import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ConfigurationService} from './configuration.service';
import {DebugService} from './debug.service';

@NgModule({
   imports: [
      CommonModule
   ],
   declarations: [],
   providers: [
      ConfigurationService,
      DebugService,
   ]
})
export class ConfigurationModule {
}
