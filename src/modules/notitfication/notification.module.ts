import {Module} from "@nestjs/common";
import {NotificationService} from "./notification.service";
import {NotificationController} from "./notification.controller";
import {MongooseModule} from "@nestjs/mongoose";
import {Note,NoteSchema} from "../../models/notification/notification.schema";
import {Customer, CustomerSchema} from "../../models/customer/customer.schema";


@Module({
    imports:[MongooseModule.forFeature([{name: Note.name, schema: NoteSchema}, {name: Customer.name, schema: CustomerSchema}])],
    providers:[NotificationService],
    controllers:[NotificationController]
})
export class NotificationModule {

}