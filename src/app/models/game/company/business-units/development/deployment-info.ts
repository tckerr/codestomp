export class DeploymentInfo {
   public lastDeployUtc: string;
   public lastDeployInitiatedUtc: string;
   public deployCount: number;
   public currentDeployRate: number;
   public deploying: boolean;

   constructor(json: any) {
      this.lastDeployUtc = json.lastDeployUtc;
      this.lastDeployInitiatedUtc = json.lastDeployInitiatedUtc;
      this.deployCount = json.deployCount;
      this.deploying = json.deploying;
      this.currentDeployRate = json.currentDeployRate;
   }
}
