import { Module } from "@nestjs/common";
import { DesignerDomainModule } from "../domain/designer-domain.module";
import { DesignerController } from "./controller/designer.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserEntity } from "./entity/user.entity";
import { DesignerEntity } from "./entity/designer.entity";


@Module({
    imports: [
        TypeOrmModule.forRoot({
            type: 'postgres',
            host: '127.0.0.1',
            port: 5432,
            username: 'postgres',
            password: 'dikadika007',
            database: 'development-company',
            entities: [UserEntity, DesignerEntity],
            autoLoadEntities: true,
            synchronize: true
        }),
        DesignerDomainModule
    ],
    controllers: [DesignerController]

})
export class InfrastructureModule {
}
