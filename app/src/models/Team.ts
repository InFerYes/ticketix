import { person } from './Person';
export class team{
    public name:string="";
    public leadernickname:string = "";
    public createdate:Date=new Date;
    public modifdate=new Date;
    public idpersonleader:number=0;
    public members:person[] =<person[]>[];
}