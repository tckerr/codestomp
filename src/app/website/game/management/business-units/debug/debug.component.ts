import { Component, OnInit } from '@angular/core';
import {DebugService} from '../../../../../services/debug.service';

@Component({
  selector: 'app-debug',
  templateUrl: './debug.component.html',
  styleUrls: ['./debug.component.css']
})
export class DebugComponent implements OnInit {

  constructor(private debugService: DebugService) { }

  ngOnInit() {
  }

  getConfig(){
     let results = [];
     for (let obj in this.debugService.config) {
        results.push(obj)
     }
     return results
  }

  setProp(key, value){
     let ctor = this.debugService.config[key].constructor;
     this.debugService.config[key] = ctor(value);
  }

}
