import {Injectable} from "@nestjs/common";
import {InjectModel} from "@nestjs/mongoose";
import {Model} from "mongoose";
import {Customer, CustomerDocument} from "../../models/customer/customer.schema";
import {Call, CallDocument} from "../../models/call/call.schema";
import {v4 as uuidv4} from 'uuid';
import {customerPlanData} from "../../models/customer/customer.interface";

@Injectable()
export class CallService {
    constructor(@InjectModel(Call.name) private callModel: Model<CallDocument>,
                @InjectModel(Customer.name) private customerModel: Model<CustomerDocument>) {
    }



    async createCall(from: string, to: string, time: number): Promise<Call> {
        const fromCustomer = await this.customerModel.findOne({customerId: from});
        const planData: customerPlanData = {...fromCustomer.planData,availableCalls: fromCustomer.planData.availableCalls - 1,availableMinutes: fromCustomer.planData.availableMinutes - time / 60};

        await this.customerModel.findOneAndUpdate({customerId: fromCustomer.customerId}, {$set: {planData:planData}})
        const toCustomer = await this.customerModel.findOne({customerId: to});
        const call = await this.callModel.create({
            from: fromCustomer,
            to: toCustomer,
            callId: uuidv4(),
            time: this.getTimeFromNumber(time)
        })
        return call
    }


    async getCallsByCustomer(customerId: string): Promise<Call[]> {
        const allCalls = await this.callModel.find();
        const filteredCalls = allCalls.filter((call: Call) => call.from.customerId === customerId || call.to.customerId === customerId);
        return filteredCalls;
    }


    private getTimeFromNumber(time: number): string {
        let minutes = Math.floor(time / 60);
        let sec = Math.floor(((time/60) - minutes) *60);
        return `${minutes}:${sec}`
    }


}