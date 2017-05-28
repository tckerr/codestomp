export class Unlocks {
   public deployments: number;

   constructor(json: any){
      this.deployments = json.deployments;
   }
}
