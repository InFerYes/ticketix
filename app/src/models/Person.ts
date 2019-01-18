import { ticket } from './Ticket';
export class person{
    public firstName:string="";
    public lastName:string="";
    public email:string="";
    public nickName:string="";
    public hasAgreedToPrivacyPolicy:boolean=false;
    public hasPaid:boolean=false;
    public hasOrderedTicket:boolean=false;
    public ticket:ticket=new ticket;
    public hasActivated: boolean=false;
    public uid:string="";
}