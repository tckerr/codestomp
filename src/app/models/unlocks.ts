export class Unlocks {
   public deployments: number;
   public manualTesting: number;

   constructor(json: any) {
      this.deployments = json.deployments;
      this.manualTesting = json.manualTesting;
   }
}
