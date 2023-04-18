import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import {HydratedDocument} from 'mongoose';
import {Plan} from "../plan/plan.schema";
import {
    customerAddress,
    customerBanAndReason, customerDocumentData,
    customerPaymentMethod,
    customerPlanData,
    customerSensetiveData
} from "./customer.interface";
import {Order} from "../order/order.schema";
import {Product} from "../product/product.schema";
import {Note} from "../notification/notification.schema";
import {Chat} from "../chat/chat.schema";

export type CustomerDocument = HydratedDocument<Customer>;

@Schema()
export class Customer {

    @Prop()
    id: string;

    @Prop()
    email: string;

    @Prop()
    password: string

    @Prop()
    token: string;

    @Prop()
    actualBilling: number = 0;

    @Prop()
    actualPlan: Plan = {} as Plan;

    @Prop()
    lastPlanes: Plan[];

    @Prop()
    paymentMethods: customerPaymentMethod[];

    @Prop()
    customerSensetiveData: customerSensetiveData = {} as customerSensetiveData;

    @Prop()
    address: customerAddress = {} as customerAddress;

    @Prop()
    planData: customerPlanData = {} as customerPlanData;

    @Prop()
    customerId: string;

    @Prop()
    role: string;

    @Prop()
    customerBanAndReason: customerBanAndReason;

    @Prop()
    orders: Order[]

    @Prop()
    items: Array<Product>

    @Prop()
    actualPhoneNumber: string;

    @Prop()
    documents: string[]

    @Prop()
    balance: number;

    @Prop()
    customerDocumentInfo: customerDocumentData

    @Prop()
    notes: Note[]

}

export const CustomerSchema = SchemaFactory.createForClass(Customer);
