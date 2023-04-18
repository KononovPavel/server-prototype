import {Injectable} from "@nestjs/common";
import {InjectModel} from "@nestjs/mongoose";
import {Product, ProductDocument} from "../../models/product/product.schema";
import {Model} from "mongoose";
import {FileService} from "../file/file.service";
import {v4 as uuidv4} from 'uuid';
import {Category, CategoryDocument} from "../../models/product/category.schema";

@Injectable()
export class ProductService {
    constructor(@InjectModel(Product.name) private productModel: Model<ProductDocument>,
                @InjectModel(Category.name) private categoryModel: Model<CategoryDocument>,
                private fileService: FileService) {
    }

    private productsFolderName = "products"


    async createProduct(product: Product, files: Express.Multer.File[]): Promise<Product> {
        let images: string[] = [];

        if (!!files?.length) {
            images = files?.map((file: Express.Multer.File) => this.fileService.createFile(file, this.productsFolderName))
        }
        const category = await this.categoryModel.findOne({value: product.category});
        const data = await this.productModel.create({
            ...product,
            images: images,
            productId: uuidv4(),
            category: category.value
        });

        return data;
    }

    async createCategory(cat: Category): Promise<Category> {
        const id = uuidv4();
        const data = await this.categoryModel.create({categoryId: id, value: cat.value});
        return data;
    }

    async getAllProducts(): Promise<Product[]> {
        const products = await this.productModel.find();
        return products
    }

    async getAllCatagories() {
        const categories = await this.categoryModel.find();
        return categories;
    }

   async getProductsByCategory(category: string): Promise<Product[]> {
        const products = await this.productModel.find({category: category});
        return products;
    }

   async getProductById(productId: string) {
        const product = await this.productModel.findOne({productId: productId});
        return product;
    }
}