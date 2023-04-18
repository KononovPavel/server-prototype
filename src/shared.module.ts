import {Module} from "@nestjs/common";
import {PlanModule} from "./modules/plan/plan.module";
import {AuthModule} from "./modules/customer/auth/auth.module";
import {CustomerLogicModule} from "./modules/customer/customer-logic/customer-logic.module";
import {OrderModule} from "./modules/order/order.module";
import {ProductModule} from "./modules/product/product.module";
import {ChatModule} from "./modules/chat/chat.module";
import {NotificationModule} from "./modules/notitfication/notification.module";
import {CallModule} from "./modules/call/call.module";


@Module( {
    imports: [
        PlanModule,
        AuthModule,
        CustomerLogicModule,
        OrderModule,
        ProductModule,
        ChatModule,
        NotificationModule,
        CallModule
    ],
    providers:[]
})
export class SharedModule {

}