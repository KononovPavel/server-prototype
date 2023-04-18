import {Module} from "@nestjs/common";
import {ChatService} from "./chat.service";
import {ChatController} from "./chat.controller";
import {MongooseModule} from "@nestjs/mongoose";
import {Chat, ChatSchema} from "../../models/chat/chat.schema";
import {FileService} from "../file/file.service";
import {Customer, CustomerSchema} from "../../models/customer/customer.schema";
import {ChatGateway} from "./chat.gateway";
import {CustomerService} from "../customer/customer-logic/customer.service";


@Module({
    imports:[MongooseModule.forFeature([{name: Chat.name, schema: ChatSchema}, {name: Customer.name, schema: CustomerSchema}])],
    providers:[ChatService, FileService, ChatGateway, CustomerService],
    controllers: [ChatController]
})
export class ChatModule {

}