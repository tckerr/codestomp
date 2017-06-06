import {Injectable} from "@angular/core";

@Injectable()
export class ResourcesSeedGeneratorService {

   constructor() {
   }

   public build(): any {
      return {
         funds: {
            balance: 0,
            totalAccumulated: 0,
            canBeNegative: false
         },
         skills: {
            coding: {
               balance: 300,
               totalAccumulated: 3,
               level: 1,
               improvementConstant: 2,
            },
            testing: {
               balance: 500,
               totalAccumulated: 5,
               level: 1,
               improvementConstant: 3,
            },
            deploying: {
               balance: 100,
               totalAccumulated: 100,
               level: 1,
               improvementConstant: 20,
            },
            bugFixing: {
               balance: 1,
               totalAccumulated: 1,
               level: 1,
               improvementConstant: 1,
            },
            scouting: {
               balance: 1,
               totalAccumulated: 1,
               level: 1,
               improvementConstant: 1,
            },
         },
         code: {
            pushed: {
               balance: 0,
               totalAccumulated: 0,
               canBeNegative: false
            },
            tested: {
               balance: 0,
               totalAccumulated: 0,
               canBeNegative: false
            },
            deploying: {
               balance: 0,
               totalAccumulated: 0,
               canBeNegative: false
            },
            prod: {
               balance: 0,
               totalAccumulated: 0,
               canBeNegative: false
            },
            bugs: {
               balance: 0,
               totalAccumulated: 0,
               canBeNegative: false
            }
         },
         customers: {
            balance: 0,
            totalAccumulated: 0,
            canBeNegative: false
         }
      };
   };
}



