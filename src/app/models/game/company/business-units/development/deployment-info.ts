export class DeploymentInfo {
   public lastDeployUtc: string;
   public deployCount: number;

   constructor(json:any){
      this.lastDeployUtc = json.lastDeployUtc;
      this.deployCount = json.deployCount;
   }
}
