import { person } from './Person';
export class team{
    public id:number=0;
    public name:string="";
    public leadernickname:string = "";
    public createdate:Date=new Date;
    public modifdate=new Date;
    public idleader:number=0;
    public members:person[] =<person[]>[];
    public isinvitationopen: boolean = false;
    public ismember: boolean = false;
}