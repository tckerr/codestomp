import {DevelopmentBusinessUnit} from './business-units/development/development-business-unit';
import {BaseBusinessUnit} from './business-units/base-business-unit';
import {IBusinessUnit} from './business-units/ibusiness-unit';
import {HrBusinessUnit} from './business-units/hr-business-unit';

export class BusinessUnitCollection {
   public development: DevelopmentBusinessUnit;
   public debug: BaseBusinessUnit;
   public hr: HrBusinessUnit;
   public corporate: BaseBusinessUnit;

   constructor(json: any) {
      this.development = new DevelopmentBusinessUnit(json.development);
      this.debug = new BaseBusinessUnit(json.debug);
      this.corporate = new BaseBusinessUnit(json.corporate);
      this.hr = new HrBusinessUnit(json.hr);
   }

   public $asList(): IBusinessUnit[] {
      return [this.development, this.debug, this.hr, this.corporate];
   }
}
