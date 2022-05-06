import {NestFactory} from '@nestjs/core';
import {AppModule} from './app.module';
import {ValidationPipe} from '@nestjs/common'

async function bootstrap() {
    const app = await NestFactory.create(AppModule, {
        logger: ['log', 'error']
    });
    app.useGlobalPipes(new ValidationPipe({whitelist: true}))
    app.enableCors()
    await app.listen(1234);
}

bootstrap().catch((err) => console.log(err));
