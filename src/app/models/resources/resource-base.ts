import {Subject} from 'rxjs/Subject';
import {ResourceUpdate} from './resource-update';

export class ResourceBase {

   public balance: number;
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

   remove(count: number) {
      let oldVal = this.balance;
      this.balance -= count;
      this.$source.next(new ResourceUpdate(oldVal, this.balance, this.totalAccumulated, this.balance - oldVal, this));
   }
}
