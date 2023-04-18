import {Body, Controller, Get, Header, HttpCode, HttpStatus, Param, Post, Query, Res} from "@nestjs/common";
import {CreatePlanDto} from "../../dto/create-plan.dto";
import {PlanService} from "./plan.service";
import {ObjectId} from "mongoose";


@Controller("/plan")
export class PlanController {

    constructor(private planService: PlanService) {

    }


    @Post()
    @HttpCode(HttpStatus.CREATED)
    @Header('Cache-Control', 'none')
    createPlan(@Body() plan: CreatePlanDto, @Res() response) {
        try {
            const newPlan = this.planService.createPlan(plan);
            return response.status(HttpStatus.CREATED).json(newPlan);
        } catch (err) {
            return response.status(HttpStatus.BAD_REQUEST).json({
                statusCode: 400,
                message: err.message,
                error: 'Bad Request'
            });
        }
    }

    @Get('/:planId')
    getPlanById(@Param('planId') planId: string) {
        return this.planService.getPlanById(planId)
    }

    @Get()
    getAllPlans() {
        return this.planService.getAllPlans();
    }
}