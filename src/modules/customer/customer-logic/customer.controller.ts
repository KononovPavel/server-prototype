import {Body, Controller, Get, Param, Post, Put, UploadedFiles, UseInterceptors} from "@nestjs/common";
import {CustomerService} from "./customer.service";
import {FilesInterceptor} from "@nestjs/platform-express";
import {Customer} from "../../../models/customer/customer.schema";

@Controller('/customer')
export class CustomerController {
    constructor(private customerService: CustomerService) {
    }

    @Put('/:customerId')
    updateCustomer(@Body() customer: Customer, @Param('customerId') customerId: string) {
        return this.customerService.updateCustomerInfo(customer, customerId);
    }

    @Post("/:customerId")
    @UseInterceptors(FilesInterceptor("images", 6))
    uploadCustomerDocuments(@UploadedFiles() files: Array<Express.Multer.File>, @Param("customerId") customerId: string) {
        return this.customerService.uploadCustomerDocument(customerId, files);
    }

    @Get("/:customerId")
    getCustomerById(@Param("customerId") id: string) {
        return this.customerService.getCustomerById(id);
    }

    @Get()
    getAllCustomers() {
        return this.customerService.getAllCustomers();
    }

    @Post()
    @UseInterceptors(FilesInterceptor("images", 6))
    createNewCustomer(@Body() customer: Customer, @UploadedFiles() files: Array<Express.Multer.File>) {
        return this.customerService.createNewCustomer(customer, files);
    }

    @Post('/search/:phoneNumber')
    getCustomerByPhoneNumber(@Param('phoneNumber') phoneNumber: string) {
        return this.customerService.getCustomerByPhoneNumber(phoneNumber);
    }

}