export class Unlocks {
   public deployments: number;
   public manualTesting: number;
   public hiring: {
      development: number,
      hr: number,
      debug: number,
   };
   public bugFixes: number;

   constructor(json: any) {
      this.deployments = json.deployments;
      this.manualTesting = json.manualTesting;
      this.hiring = json.hiring;
      this.bugFixes = json.bugFixes;
   }
}
