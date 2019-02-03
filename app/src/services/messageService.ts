import {message} from '../models/Message'
export class MessageService {
    public messages: message[] = <message[]>[];
    constructor() {

    }

    addMessage(message:message) {
        this.messages.push(message);
    }

    clearMessages(){
        this.messages = <message[]>[];
    }
}
export const messageService = new MessageService();