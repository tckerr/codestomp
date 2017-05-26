import { Injectable } from '@angular/core';
import {DateService} from "./date.service";
import {Moment} from "moment";

@Injectable()
export class WorldService {
   private date: Moment;

  constructor(private dateService: DateService) {
     this.dateService.pipeline.subscribe(p => this.date = p);
     this.dateService.start();
  }

}
