import {Body, Controller, Get, Param, Post, Put} from "@nestjs/common";
import {OrderService} from "./order.service";
import {Plan} from "../../models/plan/plan.schema";
import {Product} from "../../models/product/product.schema";


@Controller('/order')
export class OrderContoller {
    constructor(private orderService: OrderService) {
    }


    @Post("/:customerId/:orderType")
    createNewOrder(@Param('customerId') customerId: string,
                   @Body() item: Plan | Product,
                   @Param('orderType') orderType: string) {
        return this.orderService.createOrderByCustomer(customerId, item, orderType);
    }

    @Get()
    getAllOrders() {
        return this.orderService.getAllOrders();
    }

    @Get("/:customerId")
    getOrdersByCustomer(@Param("customerId") customerId: string) {
        return this.orderService.getAllCustomerOrders(customerId)
    }

    @Get("/pending/:customerId")
    getPendingOrdersByCustomer(@Param("customerId") customerId: string) {
        return this.orderService.getPendingCustomerOrders(customerId)
    }

    @Get("/:orderId")
    getOrderById(@Param("orderId") orderId: string) {
        return this.orderService.getOrderById(orderId);
    }

    @Put("/:orderId")
    acceptCustomerOrder(@Param("orderId") orderId: string) {
        return this.orderService.acceptOrder(orderId);
    }

}