export class Unlocks {
   public deployments: number;
   public manualTesting: number;
   public devHiring: number;

   constructor(json: any) {
      this.deployments = json.deployments;
      this.manualTesting = json.manualTesting;
      this.devHiring = json.devHiring;
   }
}
