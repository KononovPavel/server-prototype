import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import {HydratedDocument} from 'mongoose';
import {Plan} from "../plan/plan.schema";
import {Product} from "../product/product.schema";

export type OrderDocument = HydratedDocument<Order>;

@Schema()
export class Order {

    constructor(param: Order) {
        this.status = param.status;
        this.linkToCustomer = param.linkToCustomer;
        this.orderId = param.orderId;
        this.when_created = param.when_created;
        this.who_accept = param.who_accept;
        this.orderNumber = param.orderNumber;
    }


    @Prop()
    orderId: string;

    @Prop()
    orderNumber: number;

    @Prop()
    linkToCustomer: string;

    @Prop()
    status: string;

    @Prop()
    when_created: Date

    @Prop()
    who_accept: string

    @Prop()
    orderType: string;

    @Prop()
    plan: Plan;

    @Prop()
    product: Product

}

export const OrderSchema = SchemaFactory.createForClass(Order);