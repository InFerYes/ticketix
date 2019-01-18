import { person } from './Person';
export class team{
    public name:string="";
    public leader:person=new person;
    public members:person[]=<person[]>[];
}