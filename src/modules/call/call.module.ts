import {Module} from "@nestjs/common";
import {CallGateway} from "./call.gateway";
import {CallService} from "./call.service";
import {MongooseModule} from "@nestjs/mongoose";
import {Call, CallSchema} from "src/models/call/call.schema";
import {Customer, CustomerSchema} from "../../models/customer/customer.schema";
import {CallController} from "./call.controller";


@Module({
    imports:[MongooseModule.forFeature([{name: Call.name, schema: CallSchema}, {name: Customer.name, schema: CustomerSchema}])],
    providers:[CallGateway, CallService],
    controllers:[CallController]
})
export class CallModule {

}