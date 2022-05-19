import { Module } from '@nestjs/common';
import { ConfigModule } from "@nestjs/config";
import { ClientsModule, Transport } from '@nestjs/microservices'
import { UserService } from "./service/user/user.service";
import { UserController } from "./controller/user.controller";
import { DesignerController } from "./controller/designer.controller";
import { DesignerService } from "./service/designer/designer.service";
import { CompanyController } from "./controller/company.controller";
import { CompanyService } from "./service/company/company.service";


@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true
        }),
        ClientsModule.register([
            {
                name: 'USER_SERVICE',
                transport: Transport.RMQ,
                options: {
                    urls: ['amqp://guest:guest@localhost:5672'],
                    queue: 'user_queue',
                    queueOptions: {
                        durable: false
                    }
                }
            }, {
                name: 'DESIGNER_SERVICE',
                transport: Transport.RMQ,
                options: {
                    urls: ['amqp://guest:guest@localhost:5672'],
                    queue: 'designer_queue',
                    queueOptions: {
                        durable: false
                    }
                }
            },
            {
                name: 'COMPANY_SERVICE',
                transport: Transport.RMQ,
                options: {
                    urls: ['amqp://guest:guest@localhost:5672'],
                    queue: 'company_queue',
                    queueOptions: {
                        durable: false
                    }
                }
            },
        ])
    ],
    controllers: [UserController, DesignerController, CompanyController],
    providers: [UserService, DesignerService, CompanyService],
})
export class AppModule {
}
