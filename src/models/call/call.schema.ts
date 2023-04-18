import {HydratedDocument} from "mongoose";
import {Prop, Schema, SchemaFactory} from "@nestjs/mongoose";
import {Customer} from "../customer/customer.schema";


export type CallDocument = HydratedDocument<Call>;

@Schema()
export class Call {

    @Prop()
    callId: string;

    @Prop()
    from: Customer;

    @Prop()
    to: Customer;

    @Prop()
    time: string;


}

export const CallSchema = SchemaFactory.createForClass(Call);