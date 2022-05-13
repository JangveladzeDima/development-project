import { Module } from "@nestjs/common";
import { UserAdapter } from "./adapter/user.adapter";
import { UserDatabaseModule } from "../infrastructure/database/user-database.module";
import { AuthModule } from "../../auth/auth.module";
import { CompanyDatabaseModule } from "../../company/infrastructure/database/company-database.module";
import { DesignerDatabaseModule } from "../../designer/infrastructure/database/designer-database.module";
import { ClientDatabaseModule } from "../../client/infrastructure/database/client-database.module";

@Module({
    imports: [
        UserDatabaseModule,
        DesignerDatabaseModule,
        CompanyDatabaseModule,
        ClientDatabaseModule,
        AuthModule
    ],
    providers: [UserAdapter],
    exports: [UserAdapter]
})
export class UserDomainModule {
}