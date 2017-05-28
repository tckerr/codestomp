export class Developer {
   public id: string;
   public firstName: string;
   public lastName: string;

   constructor(json: any) {
      this.id = json.id;
      this.firstName = json.firstName;
      this.lastName = json.lastName;
   }

   public get name() {
      return `${this.firstName} ${this.lastName}`;
   }
}
