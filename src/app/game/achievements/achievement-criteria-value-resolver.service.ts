import {Injectable} from '@angular/core';
import {AchievementCriteriaType} from '../../models/achievements/achievement-criteria-type.enum';
import {CodeService} from '../resource-services/code.service';
import {FundService} from '../resource-services/fund.service';
import {CustomerService} from '../resource-services/customer.service';
import {BusinessUnitService} from '../business-units/business-unit.service';

@Injectable()
export class AchievementCriteriaValueResolverService {

   constructor(private codeService: CodeService,
               private fundService: FundService,
               private customerService: CustomerService,
               private businessUnitService: BusinessUnitService,
   ) {
      this.assertTypesResolve();
   }

   private assertTypesResolve() {
   }

   public typeToValue(criteriaType: AchievementCriteriaType): number {
      switch (criteriaType) {
         case AchievementCriteriaType.TotalPushedCodeAccumulated:
            return this.codeService.code.pushed.totalAccumulated;
         case AchievementCriteriaType.TotalTestedCodeAccumulated:
            return this.codeService.code.tested.totalAccumulated;
         case AchievementCriteriaType.TotalBugsCodeAccumulated:
            return this.codeService.code.bugs.totalAccumulated;
         case AchievementCriteriaType.TotalProdCodeAccumulated:
            return this.codeService.code.prod.totalAccumulated;
         case AchievementCriteriaType.TotalFundsAccumulated:
            return this.fundService.funds.totalAccumulated;
         case AchievementCriteriaType.ConcurrentCustomers:
            return this.customerService.customers.balance;
         case AchievementCriteriaType.UnlockedBusinessUnits:
            return this.businessUnitService.totalUnlocked;
      }
      let type = AchievementCriteriaType[<any>criteriaType];
      throw Error(`You have not implemented a return value for the AchievementCriteriaType '${type}'`);
   }

   public typeToUnitString(criteriaType: AchievementCriteriaType): string {
      switch (criteriaType) {
         case AchievementCriteriaType.TotalPushedCodeAccumulated:
            return 'code pushed';
         case AchievementCriteriaType.TotalTestedCodeAccumulated:
            return 'code tested';
         case AchievementCriteriaType.TotalBugsCodeAccumulated:
            return 'bugs seen';
         case AchievementCriteriaType.TotalProdCodeAccumulated:
            return 'code deployed';
         case AchievementCriteriaType.TotalFundsAccumulated:
            return 'funds earned';
         case AchievementCriteriaType.ConcurrentCustomers:
            return 'customers sustained';
         case AchievementCriteriaType.UnlockedBusinessUnits:
            return 'business units purchased';
      }
      let type = AchievementCriteriaType[<any>criteriaType];
      throw Error(`You have not implemented a unit string for the AchievementCriteriaType '${type}'`);
   }


}
