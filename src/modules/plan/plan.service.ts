import {Injectable} from "@nestjs/common";
import {InjectModel} from "@nestjs/mongoose";
import {Plan, PlanDocument} from "../../models/plan/plan.schema";
import {Model, ObjectId} from "mongoose";
import {CreatePlanDto} from "../../dto/create-plan.dto";


@Injectable()
export class PlanService {

    constructor(@InjectModel(Plan.name) private planModel: Model<PlanDocument>) {
    }


    async createPlan(plan: CreatePlanDto): Promise<Plan> {
        let newPlan: Plan = {...plan, totalPrice: plan.services.reduce((a,b)=> a + b.price.value, 0)};
        const createdPlan = new this.planModel(newPlan);
        return await createdPlan.save();
    }

    async getPlanById(id: string): Promise<Plan> {
        const foundedPlan = await this.planModel.findOne({planId: id});
        return foundedPlan;
    }

    async getAllPlans(): Promise<Plan[]> {
        const allPlans = await this.planModel.find();
        return allPlans;
    }

}