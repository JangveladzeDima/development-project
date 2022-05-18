import { Module } from '@nestjs/common';
import { ConfigModule } from "@nestjs/config";
import { ClientsModule, Transport } from '@nestjs/microservices'
import { UserService } from "./service/user.service";
import { UserController } from "./controller/user.controller";


@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true
        }),
        ClientsModule.register([{
            name: 'USER_SERVICE',
            transport: Transport.RMQ,
            options: {
                urls: ['amqp://guest:guest@localhost:5672'],
                queue: 'user_queue',
                queueOptions: {
                    durable: false
                }
            }
        }])
    ],
    controllers: [UserController],
    providers: [UserService],
})
export class AppModule {
}
