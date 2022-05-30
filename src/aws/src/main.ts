import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Transport } from "@nestjs/microservices";

async function bootstrap() {
    const app = await NestFactory.createMicroservice(AppModule, {
        logger: ['log', 'error'],
        transport: Transport.RMQ,
        options: {
            urls: ['amqp://guest:guest@localhost:5672'],
            queue: 'aws_queue',
            queueOptions: {
                durable: false
            },
        }
    });
    await app.listen();
}

bootstrap();
