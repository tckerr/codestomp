export class EnumParser {
   public static getMembers(myEnum): string[] {
      let members = []
      for (let i: number = 0; true; i++) {
         if (myEnum[i] === undefined) break
         members.push(myEnum[i])
      }
      return members
   }
}
