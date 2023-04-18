import {PriceInterface} from "./price.interface";

export interface ServiceInterface {
    id: string,
    price: PriceInterface,
    icon: string,
    name: string,
    description: string,
    value: number,
}