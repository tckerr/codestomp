import { Injectable } from '@angular/core';

@Injectable()
export class IdGeneratorService {

  public generate(): string {
      let c = '';
      for (c; c.length < 32;)
         c += Math.random().toString(36).substr(2, 1)
      return c;
   }

}
