import {HydratedDocument} from "mongoose";
import {Prop, Schema, SchemaFactory} from "@nestjs/mongoose";
import {Message} from "./message.interface";
import {Customer} from "../customer/customer.schema";


export type ChatDocument = HydratedDocument<Chat>;

@Schema()
export class Chat {

    @Prop()
    chatId: string;

    @Prop()
    messages: Message[];

    @Prop()
    chatName: string;

    @Prop()
    image: string;

    @Prop()
    from: Customer;

    @Prop()
    to: Customer;


}

export const ChatSchema = SchemaFactory.createForClass(Chat);