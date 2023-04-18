import {Body, Controller, Get, Post, Req} from "@nestjs/common";
import {AuthService} from "./auth.service";
import {CreateCustomerDto} from "../../../dto/create-customer.dto";


@Controller('/auth')
export class AuthController {
    constructor(private authService: AuthService) {
    }

    @Post()
    customerRegistration(@Body() customer: CreateCustomerDto) {
        return this.authService.registration(customer);
    }

    @Post('/login')
    login(@Body() customer: CreateCustomerDto) {
        return this.authService.login(customer)
    }

    @Get()
    auth(@Req() req: Request) {
        return this.authService.signIn(req.headers["authorization"]);
    }
}