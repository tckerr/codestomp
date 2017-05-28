export class Developer {
   public id: string;
   public firstName: string;
   public lastName: string;
   public automatic: boolean;

   constructor(json: any) {
      this.id = json.id;
      this.firstName = json.firstName;
      this.lastName = json.lastName;
      this.automatic = json.automatic;
   }

   public get name() {
      return `${this.firstName} ${this.lastName}`;
   }
}
