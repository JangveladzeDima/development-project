import {NestFactory} from '@nestjs/core';
import {CryptoHashModule} from './crypto-hash.module'
import {Transport} from "@nestjs/microservices";


async function bootstrap() {
    const app = await NestFactory.createMicroservice(CryptoHashModule, {
        transport: Transport.RMQ,
        options: {
            urls: ["amqp://guest:guest@localhost:5672"],
            queue: "hash_queue",
            queueOptions: {
                durable: false
            }
        }
    })
    await app.listen();
}

bootstrap();
