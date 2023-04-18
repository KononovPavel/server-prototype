import {HttpException, HttpStatus, Injectable} from "@nestjs/common";
import {InjectModel} from "@nestjs/mongoose";
import {Model} from "mongoose";
import {Customer, CustomerDocument} from "../../../models/customer/customer.schema";
import {CreateCustomerDto} from "../../../dto/create-customer.dto";
import {FileService} from "../../file/file.service";
import {hash} from "bcrypt";
import {v4 as uuidv4} from 'uuid';


@Injectable()
export class CustomerService {
    constructor(@InjectModel(Customer.name) private customerModel: Model<CustomerDocument>,
                private fileService: FileService) {
    }

    private customersFolderName: string = "customers"


    async updateCustomerInfo(customer: CreateCustomerDto, customerId: string): Promise<Customer | HttpException> {
        const updatedCustomer = await this.customerModel.findOneAndUpdate({customerId: customerId}, customer, {new: true})
        return updatedCustomer;
    }

    async uploadCustomerDocument(customerId: string, files: Array<Express.Multer.File>): Promise<Customer | HttpException> {
        let images: string[] = [];
        if (!!files?.length) {
            images = files?.map((file: Express.Multer.File) => this.fileService.createFile(file, this.customersFolderName))
        }
        const customer = await this.customerModel.findOne({customerId: customerId});
        customer.documents = [...customer.documents, ...images];
        const data = await this.customerModel.findOneAndUpdate({customerId: customerId}, customer, {new: true});
        return data;
    }

    async getCustomerById(customerId: string): Promise<Customer> {
        return this.customerModel.findOne({customerId: customerId})
    }

    async getAllCustomers(): Promise<Customer[]> {
        const customers = await this.customerModel.find();
        return customers
    }


    async createNewCustomer(customer: Customer, files: Array<Express.Multer.File>): Promise<Customer | HttpException> {
        const isFoundedCustomer = await this.customerModel.findOne({email: customer.email});
        if (!!isFoundedCustomer) {
            return new HttpException('Customer with email already existing', HttpStatus.BAD_REQUEST);
        }
        if (!customer?.password || customer?.password?.length < 8) {
            return new HttpException('Password doesnt match', HttpStatus.BAD_REQUEST);
        }
        const hashPassword = await hash(customer.password, 5);
        const customerId = uuidv4();
        const newCustomer = await this.customerModel.create({
            ...customer,
            password: hashPassword,
            role: 'Customer',
            customerId: customerId
        })
        return newCustomer;
    }

    async getCustomerByPhoneNumber(phoneNumber: string): Promise<Customer> {
        const customer = await this.customerModel.findOne({actualPhoneNumber: phoneNumber});
        if (!customer) {
            return null;
        }
        return customer;
    }


    async setCustomerMessages(customer: Customer): Promise<number> {
        const updatedCustomer: Customer = {
            ...customer,
            planData: {...customer.planData, availableSms: customer.planData.availableSms - 1}
        }
        await this.customerModel.findOneAndUpdate({customerId: customer.customerId}, updatedCustomer);
        return updatedCustomer.planData.availableSms
    }


    async setCustomerInternet(customer: Customer, internet: number): Promise<number> {
        const updatedCustomer: Customer = {
            ...customer,
            planData: {...customer.planData, availableInternet: customer.planData.availableInternet - internet}
        }
        await this.customerModel.findOneAndUpdate({customerId: customer.customerId}, updatedCustomer);
        return updatedCustomer.planData.availableInternet;
    }
}