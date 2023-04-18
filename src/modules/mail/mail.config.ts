import { join } from 'path';
import {EjsAdapter} from "@nestjs-modules/mailer/dist/adapters/ejs.adapter";
import {ConfigService} from "@nestjs/config";

export const getMailConfig = async (configService: ConfigService): Promise<any> => {
    const MAIL_TRANSPORT="smtps://ermkonir@yandex.ru:28ermkon@smtp.yandex.ru"
    const MAIL_FROM_NAME="Prototype Company"
    const transport =  MAIL_TRANSPORT;
    const mailFromName =  MAIL_FROM_NAME;
    const mailFromAddress = transport.split(':')[1].split('//')[1];

    return {
        transport,
        defaults: {
            from: `"${mailFromName}" <${mailFromAddress}>`,
        },
        template: {
            dir: join(__dirname, './templates'),
            adapter: new EjsAdapter(),
            options: {
                strict: false,
            },
        },
    };
};