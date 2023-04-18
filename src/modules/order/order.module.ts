import {Module} from "@nestjs/common";
import {MongooseModule} from "@nestjs/mongoose";
import {Order, OrderSchema} from "../../models/order/order.schema";
import {OrderService} from "./order.service";
import {OrderContoller} from "./order.contoller";
import {Customer, CustomerSchema} from "../../models/customer/customer.schema";


@Module({
    imports: [MongooseModule.forFeature([{name: Order.name, schema: OrderSchema}, {name: Customer.name, schema: CustomerSchema}])],
    providers:[OrderService],
    controllers:[OrderContoller]
})

export class OrderModule {

}