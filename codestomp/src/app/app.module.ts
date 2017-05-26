import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import {DateService} from "./world-context/date.service";

@NgModule({
   declarations: [
      AppComponent,
   ],
   imports: [
      BrowserModule,
      FormsModule,
      HttpModule
   ],
   providers: [DateService],
   bootstrap: [AppComponent]
})
export class AppModule {}
