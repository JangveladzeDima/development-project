import {NestFactory} from '@nestjs/core';
import {AppModule} from './app.module';

async function bootstrap() {
    const app = await NestFactory.create(AppModule, {
        logger: ['log', 'error']
    });
    await app.listen(7777);
}

bootstrap().catch((err) => console.log(err));
