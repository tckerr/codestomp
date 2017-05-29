import { Component, OnInit } from '@angular/core';
import {DeveloperStaffService} from '../../../../../../services/resource-services/developer-staff.service';
import {Staff} from '../../../../../../models/business-units/staff';

@Component({
  selector: 'app-development-staff',
  templateUrl: './development-staff.component.html',
  styleUrls: ['./development-staff.component.css']
})
export class DevelopmentStaffComponent implements OnInit {

  constructor(private developerStaffService: DeveloperStaffService,) { }

  ngOnInit() {
  }

  public get devStaff() : Staff[] {
     return this.developerStaffService.staff;
  }

  public fire(displayName: string){
     this.developerStaffService.fire(displayName);
  }

}
