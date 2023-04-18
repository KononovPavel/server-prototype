import {Module} from "@nestjs/common";
import {PlanService} from "./plan.service";
import {MongooseModule} from "@nestjs/mongoose";
import {Plan, PlanSchema} from "../../models/plan/plan.schema";
import {PlanController} from "./plan.controller";


@Module({
    imports: [MongooseModule.forFeature([{name: Plan.name, schema: PlanSchema}])],
    providers: [PlanService],
    controllers: [PlanController],
})

export class PlanModule {

}