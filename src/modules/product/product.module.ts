import {Module} from "@nestjs/common";
import {MongooseModule} from "@nestjs/mongoose";
import {Product, ProductSchema} from "../../models/product/product.schema";
import {ProductService} from "./product.service";
import {ProductController} from "./product.controller";
import {FileService} from "../file/file.service";
import {HttpAdapterHost} from "@nestjs/core";
import {Category, CategorySchema} from "../../models/product/category.schema";


@Module({
    imports: [MongooseModule.forFeature([{name: Product.name, schema: ProductSchema}, {name: Category.name, schema: CategorySchema}])],
    controllers: [ProductController],
    providers: [
        ProductService,
        FileService,
        HttpAdapterHost
    ]
})

export class ProductModule {

}