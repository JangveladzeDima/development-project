import { Module } from "@nestjs/common";
import { UserService } from "./user/service/user.service";
import { DesignerDatabaseModule } from "../designer/src/infrastructure/database/designer-database.module";
import { CompanyDatabaseModule } from "../company/infrastructure/database/company-database.module";
import { ClientDatabaseModule } from "../client/infrastructure/database/client-database.module";

@Module({
    imports: [
        DesignerDatabaseModule,
        CompanyDatabaseModule,
        ClientDatabaseModule
    ],
    providers: [UserService],
    exports: [UserService]
})
export class ServiceModule {
}