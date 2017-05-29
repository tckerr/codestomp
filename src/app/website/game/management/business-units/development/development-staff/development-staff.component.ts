import { Component, OnInit } from '@angular/core';
import {DeveloperStaffService} from '../../../../../../services/resource-services/developer-staff.service';

@Component({
  selector: 'app-development-staff',
  templateUrl: './development-staff.component.html',
  styleUrls: ['./development-staff.component.css']
})
export class DevelopmentStaffComponent implements OnInit {

  constructor(private developerStaffService: DeveloperStaffService,) { }

  ngOnInit() {
  }

  private get associateCount(){
     return this.developerStaffService.staff.associateDeveloper;
  }

}
