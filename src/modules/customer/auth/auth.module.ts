import {Module} from "@nestjs/common";
import {AuthController} from "./auth.controller";
import {AuthService} from "./auth.service";
import {MongooseModule} from "@nestjs/mongoose";
import {Customer, CustomerSchema} from "../../../models/customer/customer.schema";
import { JwtService } from "@nestjs/jwt";
import {MailService} from "../../mail/mail.service";

@Module({
    imports: [MongooseModule.forFeature([{name: Customer.name, schema: CustomerSchema}])],
    providers: [AuthService, JwtService, MailService],
    controllers: [AuthController]
})

export class AuthModule {

}