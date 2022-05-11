import {Module} from '@nestjs/common';
import {UserModule} from "./user/user.module";
import {ConfigModule} from "@nestjs/config";
import {TypeOrmModule} from "@nestjs/typeorm";
import {DesignerModule} from "./designer/designer.module";
import {CompanyModule} from "./company/company.module";
import config from "./common/config/configuration";

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal:true
        }),
        TypeOrmModule.forRoot({...config().db
        }),
        UserModule,
        DesignerModule,
        CompanyModule
    ],
    controllers: [],
    providers: [],
    exports: []
})
export class AppModule {
}
