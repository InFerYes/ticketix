import { person } from './Person';
export class team{
    public name:string="";
    public leader:string = ""; //firebase uid
    public members:string[]=<string[]>[]; //bevat firebase uids
}