import { Injectable } from '@angular/core';
import {ConfigurationService} from './configuration.service';

@Injectable()
export class DebugService {

  constructor(public config: ConfigurationService) { }

}
