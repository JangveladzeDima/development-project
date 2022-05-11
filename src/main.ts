import {NestFactory} from '@nestjs/core';
import {AppModule} from './app.module';
import {ValidationPipe} from '@nestjs/common'
import {serve, setup} from 'swagger-ui-express'
import * as doc from './doc/doc.json'

async function bootstrap() {
    const app = await NestFactory.create(AppModule, {
        logger: ['log', 'error'],
    });


    app.useGlobalPipes(new ValidationPipe({ whitelist: true }))
    app.enableCors({
        origin:'*'
    })

    app.use('/api/doc', serve,setup(doc))
    await app.listen(1234);
}

bootstrap().catch(console.log)
