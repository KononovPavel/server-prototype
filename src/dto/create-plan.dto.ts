import {ServiceInterface} from "../models/plan/service.interface";
import {PriceInterface} from "../models/plan/price.interface";

export class CreatePlanDto {

    planId: string;

    name: string;

    images: string[];

    services: ServiceInterface[];
}