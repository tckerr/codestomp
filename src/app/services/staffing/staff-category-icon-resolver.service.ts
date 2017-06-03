import { Injectable } from '@angular/core';
import {StaffCategory} from '../../models/definitions/staff-definitions';

@Injectable()
export class StaffCategoryIconResolverService {

  constructor() { }

  public resolve(category: StaffCategory) {
      switch (category) {
         case StaffCategory.Developer:
            return 'fa-keyboard-o';
         case StaffCategory.DevOps:
            return 'fa-ship';
         case StaffCategory.QA:
            return 'fa-check-square-o';
         case StaffCategory.EmployeeRetainer:
         case StaffCategory.Recruiter:
         case StaffCategory.TalentScout:
         case StaffCategory.Trainer:
            return 'fa-user';
      }
   }

}
