import {Module} from '@nestjs/common';
import {MongooseModule} from "@nestjs/mongoose";
import {SharedModule} from "./shared.module";
import {ServeStaticModule} from "@nestjs/serve-static";
import * as path from 'path'
import {MailerModule} from "@nestjs-modules/mailer";
import {ConfigModule, ConfigService} from "@nestjs/config";
import {getMailConfig} from "./modules/mail/mail.config";

@Module({
    imports: [
        MongooseModule.forRoot('mongodb://127.0.0.1:27017/snaptoon', {useNewUrlParser: true}),
        SharedModule,
        ServeStaticModule.forRoot({rootPath: path.resolve(__dirname, 'static')}),
        MailerModule.forRootAsync({
            imports: [ConfigModule],
            useFactory: getMailConfig,
        }),
    ]
})
export class AppModule {
}
