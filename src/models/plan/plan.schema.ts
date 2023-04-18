import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import {HydratedDocument} from 'mongoose';
import {ServiceInterface} from "./service.interface";

export type PlanDocument = HydratedDocument<Plan>;

@Schema()
export class Plan {

    @Prop()
    planId: string;

    @Prop()
    name: string;

    @Prop()
    images: string[];

    @Prop()
    services: ServiceInterface[];

    @Prop()
    totalPrice: number = null;

}

export const PlanSchema = SchemaFactory.createForClass(Plan);