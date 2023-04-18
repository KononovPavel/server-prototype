import {Plan} from "../models/plan/plan.schema";
import {
    customerAddress,
    customerPaymentMethod,
    customerPlanData,
    customerSensetiveData
} from "../models/customer/customer.interface";

export class CreateCustomerDto {

    id: string;

    email: string;

    password: string;

    token: string;

    actualBilling: number;

    actualPlan: Plan;

    lastPlanes: Plan[];

    paymentMethods: customerPaymentMethod[];

    customerSensetiveData: customerSensetiveData;

    address: customerAddress;

    planData: customerPlanData;

    customerId: string;

    role: string;
}