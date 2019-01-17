import { ticket } from './Ticket';
export class person{
    public firstName:string="";
    public lastName:string="";
    public email:string="";
    public nickName:string="";
    public hasAgreedPrivacyPolicy:boolean=false;
    public hasPaid:boolean=false;
    public hasOrderedTicket:boolean=false;
    public ticket:ticket=new ticket;
}