import {HttpException, HttpStatus, Injectable} from "@nestjs/common";
import {CreateCustomerDto} from "../../../dto/create-customer.dto";
import {Customer, CustomerDocument} from "../../../models/customer/customer.schema";
import {InjectModel} from "@nestjs/mongoose";
import {Model} from "mongoose";
import {v4 as uuidv4} from 'uuid';
import {JwtService} from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import {hash} from "bcrypt";
import {MailService} from "../../mail/mail.service";

@Injectable()
export class AuthService {
    constructor(@InjectModel(Customer.name) private customerModel: Model<CustomerDocument>,
                private mailService: MailService,
                private jwtService: JwtService) {
    }

    private SECRET_KEY = "RETURN CUSTOMER DATA TOKEN"


    async registration(customer: CreateCustomerDto): Promise<Customer | HttpException> {
        const isFoundedCustomer = await this.customerModel.findOne({email: customer.email});
        if (!!isFoundedCustomer) {
            return new HttpException('Customer with email already existing', HttpStatus.BAD_REQUEST);
        }
        if (!customer?.password || customer?.password?.length < 8) {
            return new HttpException('Password doesnt match', HttpStatus.BAD_REQUEST);
        }
        const hashPassword = await hash(customer.password, 5);
        const customerId = uuidv4();

        const newCustomer = new this.customerModel({
            ...customer,
            password: hashPassword,
            email: customer.email,
            customerId: customerId,
            role: "Customer"
        });

        //const sendMail = await this.mailService.sendRegistrationMail(customer.email);

        return await newCustomer.save();
    }

    async login(customer: CreateCustomerDto): Promise<{ token: string, customer: Customer } | HttpException> {
        const foundedCustomer = await this.customerModel.findOne({email: customer.email})
        if (!foundedCustomer) {
            return new HttpException('Invalid Email', HttpStatus.NOT_FOUND);
        }

        const passwordValid = await bcrypt.compare(customer.password, foundedCustomer.password);
        if (!passwordValid) {
            return new HttpException('Invalid Password', HttpStatus.BAD_REQUEST);
        }
        const token = await this.jwtService.sign({customer: foundedCustomer}, {
            secret: this.SECRET_KEY,
            expiresIn: '1h'
        });
        return {token: token, customer: foundedCustomer};
    }


    async signIn(token: string): Promise<{ token: string, customer: Customer } | HttpException> {
        try {
            const customer: Customer = this.jwtService.verify(token, {secret: this.SECRET_KEY});
            return {token: token, customer: customer}
        } catch (err) {
            return new HttpException("Your session was expired", HttpStatus.UNAUTHORIZED)
        }
    }

}