import {HttpException, HttpStatus, Injectable} from "@nestjs/common";
import {Customer} from "../../models/customer/customer.schema";
import {Order} from "../../models/order/order.schema";
import {MailerService} from "@nestjs-modules/mailer";
import {join} from "path";

@Injectable()
export class MailService {
    constructor(private readonly mailerService: MailerService) {
    }

    async sendRegistrationMail(email: string) {
       return this.mailerService.sendMail({
            to: email,
            subject: "Successfully registration " + email,
            template: join(__dirname, 'templates', 'registrationTemplate'),
            context: {
                email: email,
                data: new Date().toLocaleDateString()
            }
        }).catch((e) => {
            throw new HttpException(
                `incorrect email service work: ${e}`,
                HttpStatus.UNPROCESSABLE_ENTITY,
            );
        });
    }

    async sendAcceptedOrderMail(order: Order) {

    }

}