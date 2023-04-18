import {Body, Controller, Get, Param, Post, UploadedFiles, UseInterceptors} from "@nestjs/common";
import {ProductService} from "./product.service";
import {Product} from "../../models/product/product.schema";
import {FilesInterceptor} from "@nestjs/platform-express";
import {Category} from "../../models/product/category.schema";


@Controller("/product")
export class ProductController {
    constructor(private productService: ProductService) {
    }


    @Post()
    @UseInterceptors(FilesInterceptor("images", 6))
    createProduct(@Body() product: Product, @UploadedFiles() files: Array<Express.Multer.File>) {
        return this.productService.createProduct(product, files);
    }

    @Post("/category")
    createCategory(@Body() cat: Category) {
        return this.productService.createCategory(cat);
    }

    @Get()
    getAllProducts() {
        return this.productService.getAllProducts();
    }

    @Get('/category')
    getAllCategory() {
        return this.productService.getAllCatagories();
    }

    @Get('/:category')
    getProductsByCategory(@Param('category') category: string) {
        return this.productService.getProductsByCategory(category);
    }

    @Get('/product/:productId')
    getProductById(@Param('productId') productId: string) {
        return this.productService.getProductById(productId);
    }
}