import {Component, OnInit} from '@angular/core';
import {DeveloperHiringPoolService} from '../../../../services/hiring-pools/developer-hiring-pool.service';


@Component({
   selector: 'app-development-hiring',
   templateUrl: './development-hiring.component.html',
   styleUrls: ['./development-hiring.component.css']
})
export class DevelopmentHiringComponent implements OnInit {

   private hireMode = false;

   constructor(private developerPool: DeveloperHiringPoolService) {
   }

   ngOnInit() {
   }

   showHires(){
      this.hireMode = true;
   }

}
