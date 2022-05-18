import { NestFactory } from '@nestjs/core';
import {UserModule} from "./user.module";
import { Transport } from '@nestjs/microservices';

async function bootstrap() {
    const app = await NestFactory.createMicroservice(UserModule, {
        transport: Transport.RMQ,
        options: {
            urls: ['amqp://guest:guest@localhost:5672'],
            queue: 'user_queue',
            queueOptions: {
                durable: false
            },
        },
    });
    await app.listen();
}

bootstrap();
