import {Staff} from './staff';

export interface IBusinessUnit {
   id: string;
   name: string;
   active: boolean;
   staff: Staff[];
}
