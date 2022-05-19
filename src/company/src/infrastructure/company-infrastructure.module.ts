import { Module } from "@nestjs/common";
import { CompanyController } from "./controller/company.controller";
import { CompanyDomainModule } from "../domain/company-domain.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CompanyEntity } from "./entity/company/copmany.entity";
import { UserEntity } from "./entity/user.entity";
import { CompanyLogoEntity } from "./entity/logo/company-logo.entity";

@Module({
    imports: [
        TypeOrmModule.forRoot({
            type: 'postgres',
            host: '127.0.0.1',
            port: 5432,
            username: 'postgres',
            password: 'dikadika007',
            database: 'development-company',
            entities: [UserEntity, CompanyEntity, CompanyLogoEntity],
            autoLoadEntities: true,
            synchronize: true
        }),
        CompanyDomainModule
    ],
    controllers: [CompanyController]
})
export class CompanyInfrastructureModule {
}