import {Customer} from "../customer/customer.schema";

export class Message {
    messageId: string;
    value: string;
    messageType: MessageType.STRING | MessageType.FILE;
    date: Date
    customer: Customer
}

export enum MessageType {
    STRING = "STRING",
    FILE = "FILE"
}