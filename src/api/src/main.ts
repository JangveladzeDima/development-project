import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
console.log(process.env.POSTGRES_HOST)
async function bootstrap() {
    const app = await NestFactory.create(AppModule, {
        logger: ['log', 'error']
    });
    await app.listen(3000);
}

bootstrap();
