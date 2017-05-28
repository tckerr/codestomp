import {Injectable} from '@angular/core';
import {Developer} from '../../models/developer';

@Injectable()
export class DeveloperHiringPoolService {

   public pool: Developer[] = [];

   constructor() {}

}
