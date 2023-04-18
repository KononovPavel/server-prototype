import {Module} from "@nestjs/common";
import {MongooseModule} from "@nestjs/mongoose";
import {Customer, CustomerSchema} from "../../../models/customer/customer.schema";
import {CustomerController} from "./customer.controller";
import {CustomerService} from "./customer.service";
import {FileService} from "../../file/file.service";


@Module({
    imports:[MongooseModule.forFeature([{name: Customer.name, schema: CustomerSchema}])],
    providers:[CustomerService, FileService],
    controllers:[CustomerController]
})

export class CustomerLogicModule {

}