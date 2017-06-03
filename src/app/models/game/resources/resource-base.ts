import {Subject} from 'rxjs/Subject';
import {ResourceUpdate} from '../../messaging/resource-update';

export class ResourceBase {

   public balance: number;
   protected canBeNegative: boolean = false;
   public totalAccumulated: number;
   private $source = new Subject<ResourceUpdate>();

   public $updatedPipeline = this.$source.asObservable();

   constructor(json: any) {
      this.balance = json.balance;
      this.totalAccumulated = json.totalAccumulated;
   }

   add(count: number) {
      let oldVal = this.balance;
      this.balance += count;
      this.totalAccumulated += count;
      this.$source.next(new ResourceUpdate(oldVal, this.balance, this.totalAccumulated, this.balance - oldVal, this));
   }

   remove(count: number, strict: boolean = false) {
      let previousBalance = this.balance;
      this.balance = this.balance - count;
      if (!this.canBeNegative && strict && this.balance < 0 )
         throw Error("Not enough resources!");
      if (!this.canBeNegative)
         this.balance = Math.max(0, this.balance);
      let delta = this.balance - previousBalance;
      this.$source.next(new ResourceUpdate(previousBalance, this.balance, this.totalAccumulated, delta, this));
      return delta;
   }

   public get $balanceFloored(){
      return Math.floor(this.balance);
   }
}
