import {Module} from '@nestjs/common';
import {UserModule} from "./user/user.module";
import {ConfigModule} from "@nestjs/config";
import {TypeOrmModule} from "@nestjs/typeorm";
import {DesignerModule} from "./designer/designer.module";
import {CompanyModule} from "./company/company.module";

@Module({
    imports: [
        ConfigModule.forRoot({ isGlobal: true }),
        TypeOrmModule.forRoot({
            type: 'postgres',
            host: process.env.POSTGRES_HOST,
            port: parseInt(<string>process.env.POSTGERS_PORT),
            username: process.env.POSTGRES_USER,
            password: process.env.POSTGRES_PASSWORD,
            database: process.env.POSTGRES_DATABASE,
            autoLoadEntities: true,
            synchronize: true
        }),
        UserModule,
        DesignerModule,
        CompanyModule
    ],
    controllers: [],
    providers: [],
})
export class AppModule {
}
