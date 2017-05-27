import { Injectable } from '@angular/core';
import {Company} from "../../models/company";
import {environment} from "../../../environments/environment";

@Injectable()
export class CompanyService {
   private company: Company;

  constructor() {
     let companyName = environment.gameSettings.defaults.companyName;
     this.foundCompany(companyName);
  }

  foundCompany(companyName: string){
     this.company = new Company({
        "name": companyName
     });
  }

}
