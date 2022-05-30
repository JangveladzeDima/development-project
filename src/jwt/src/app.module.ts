import { Module } from '@nestjs/common';
import { JwtController } from "./controller/jwt.controller";
import { ServiceModule } from "./service/service.module";

@Module({
    imports: [ServiceModule],
    controllers: [JwtController],
    providers: [],
})
export class AppModule {
}
