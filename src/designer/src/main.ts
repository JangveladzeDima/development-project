import { NestFactory } from "@nestjs/core";
import { DesignerModule } from "./designer.module";
import { Transport } from "@nestjs/microservices";

async function bootstrap() {
    const app = await NestFactory.createMicroservice(DesignerModule, {
        logger: ['log', 'error'],
        transport: Transport.RMQ,
        options: {
            urls: ["amqp://guest:guest@localhost:5672"],
            queue: "designer_queue",
            queueOptions: {
                durable: false
            }
        }
    });
    await app.listen();
}

bootstrap();
