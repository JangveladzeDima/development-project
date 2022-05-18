import { Module } from "@nestjs/common";
import { UserController } from "./controller/user.controller";
import { UserDomainModule } from "../domain/user-domain.module";
import { TypeOrmModule } from "@nestjs/typeorm";
@Module({
    imports: [
        TypeOrmModule.forRoot({
            type: 'postgres',
            host: '127.0.0.1',
            port: 5432,
            username: 'postgres',
            password: 'dikadika007',
            database: 'development-company',
            autoLoadEntities: true,
            synchronize: true
        }),
        UserDomainModule
    ],
    controllers: [UserController]
})
export class UserInfrastructureModule {
}