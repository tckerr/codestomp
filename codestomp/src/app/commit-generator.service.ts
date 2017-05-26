import { Injectable } from '@angular/core';
import {Http} from "@angular/http";

@Injectable()
export class CommitGeneratorService {

  constructor(private http: Http) { }

  public generate(){
     return this.http.get("http://whatthecommit.com/index.txt");
  }

}
