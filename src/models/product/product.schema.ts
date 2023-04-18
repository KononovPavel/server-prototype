import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import {HydratedDocument} from 'mongoose';
import {PriceInterface} from "../plan/price.interface";

export type ProductDocument = HydratedDocument<Product>;

@Schema()
export class Product {

    @Prop()
    productId: string;

    @Prop()
    name: string;

    @Prop()
    description: string;

    @Prop()
    image: string;

    @Prop()
    images: string[]

    @Prop()
    category: string;

    @Prop()
    price: string

}

export const ProductSchema = SchemaFactory.createForClass(Product);
