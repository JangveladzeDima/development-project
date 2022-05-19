import {NestFactory} from '@nestjs/core';
import {CompanyModule} from "./company.module";
import {Transport} from "@nestjs/microservices";

async function bootstrap() {
    const app = await NestFactory.createMicroservice(CompanyModule, {
        transport: Transport.RMQ,
        options: {
            urls: ['amqp://guest:guest@localhost:5672'],
            queue: 'company_queue',
            queueOptions: {
                durable: false
            },
        }
    });
    await app.listen();
}

bootstrap();
