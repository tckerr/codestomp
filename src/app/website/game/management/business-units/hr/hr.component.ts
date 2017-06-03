import {Component, OnInit} from '@angular/core';
import {UnlocksService} from '../../../../../services/unlocks.service';

@Component({
   selector: 'app-hr',
   templateUrl: './hr.component.html',
   styleUrls: ['./hr.component.css']
})
export class HRComponent implements OnInit {

   constructor(private unlocksService: UnlocksService) {
   }

   ngOnInit() {
   }

   public hiringUnlocked(){
      return this.unlocksService.unlocks.hiring.hr;
   }

}
