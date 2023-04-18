import {Plan} from "../models/plan/plan.schema";
import {customerPlanData} from "../models/customer/customer.interface";
import {Customer} from "../models/customer/customer.schema";

export function expandServices(plan: Plan): customerPlanData {
    return  {
        availableCalls: plan.services[1]?.value,
        availableInternet: plan.services[0]?.value,
        availableMinutes: plan.services[3]?.value,
        availableSms: plan.services[2]?.value
    };
}