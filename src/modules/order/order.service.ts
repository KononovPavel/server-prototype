import {Injectable} from "@nestjs/common";
import {InjectModel} from "@nestjs/mongoose";
import {Order, OrderDocument} from "../../models/order/order.schema";
import {Model} from "mongoose";
import {Plan} from "../../models/plan/plan.schema";
import {Product} from "../../models/product/product.schema";
import {v4 as uuidv4} from 'uuid';
import {Customer, CustomerDocument} from "../../models/customer/customer.schema";
import {expandServices} from "../../utils/customer.utils";

enum OrderStatuses {
    PENDING = "PENDING",
    RESOLVED = "RESOLVED"
}

enum orderTypes {
    PLAN = "PLAN",
    PRODUCT = "PRODUCT"
}

@Injectable()
export class OrderService {
    constructor(@InjectModel(Order.name) private orderModel: Model<OrderDocument>,
                @InjectModel(Customer.name) private customerModel: Model<CustomerDocument>) {
    }

    private CODE: string = "22"

    async createOrderByCustomer(customerId: string, item: Plan | Product, orderType: string): Promise<Order> {
        const allOrders = await this.orderModel.find();
        const length = allOrders.length;
        let _item = null;
        let itemType;
        if(orderType === orderTypes.PLAN) {
            _item = item as Plan;
            itemType = "PLAN"
        }
        if(orderType === orderTypes.PRODUCT) {
            _item = item as Product;
            itemType = "PRODUCT"
        }
        const newOrder = new this.orderModel({
            orderNumber: length,
            orderId: uuidv4(),
            when_created: new Date(),
            linkToCustomer: customerId,
            status: OrderStatuses.PENDING,
            who_accept: null,
            orderType: orderType,
            plan: itemType === "PLAN" ? _item : null,
            product: itemType === "PRODUCT" ? _item : null
        })
        return await newOrder.save();
    }

    async getOrderById(orderId: string): Promise<Order> {
        const foundedOrder = await this.orderModel.findOne({orderId: orderId})
        return foundedOrder;
    }

    async acceptOrder(orderId: string): Promise<Order> {

        const foundedOrder: Order = await this.orderModel.findOne({orderId: orderId});
        const customer: Customer = await this.customerModel.findOne({customerId: foundedOrder.linkToCustomer})
        let phoneNumber = this.createPhoneNumber(this.CODE);
        let tempCustomer = await  this.customerModel.findOne({actualPhoneNumber: phoneNumber})
        while (!!tempCustomer) {
            phoneNumber = this.createPhoneNumber(this.CODE);
            tempCustomer = await  this.customerModel.findOne({actualPhoneNumber: phoneNumber})
        }

        if (foundedOrder.orderType === orderTypes.PLAN) {
            if (!!customer?.actualPlan) {
                customer.lastPlanes.push(customer.actualPlan);
                customer.planData = expandServices(foundedOrder.plan);
                customer.actualPlan = foundedOrder.plan
            }
            if (!customer?.actualPlan) {
                customer.actualPlan = foundedOrder.plan;
                customer.planData = expandServices(foundedOrder.plan);
            }
            customer.actualPhoneNumber = phoneNumber;
        }
        if (foundedOrder.orderType === orderTypes.PRODUCT) {
            customer.items.push(foundedOrder.product)
        }
        foundedOrder.who_accept = "Tenant Manager";
        foundedOrder.status = OrderStatuses.RESOLVED;

        await this.customerModel.findOneAndUpdate({customerId: foundedOrder.linkToCustomer}, customer, {new: true})
        const data = await this.orderModel.findOneAndUpdate({orderId: orderId}, foundedOrder, {new: true})
        return data;
    }

    async getAllCustomerOrders(customerId: string): Promise<Order[]> {
        const allOrders = await this.orderModel.find({linkToCustomer: customerId})
        return allOrders;
    }

    async getAllOrders(): Promise<Order[]> {
        const allOrders = await this.orderModel.find();
        return allOrders;
    }

    createPhoneNumber(code: string): string {
        let phoneNumber: string = '';
        phoneNumber = String(Math.floor(Math.random() * (9999999 - 100000)))
        return '375' + code + phoneNumber;
    }


   async getPendingCustomerOrders(customerId: string) {
        const orders = await this.orderModel.find({linkToCustomer: customerId});
        let filteredOrders = []
        if(orders?.length) {
            filteredOrders = orders.filter((order: Order)=> order.status === "PENDING");
            return filteredOrders
        }
        return [];
    }
}