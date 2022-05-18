import { Module } from "@nestjs/common";
import { UserAdapter } from "./adapter/user.adapter";
import { UserDatabaseModule } from "../infrastructure/database/user-database.module";

@Module({
    imports: [
        UserDatabaseModule,
        // DesignerDatabaseModule,
        // CompanyDatabaseModule,
        // ClientDatabaseModule,
        // ServiceModule,
        // AuthModule
    ],
    providers: [UserAdapter],
    exports: [UserAdapter]
})
export class UserDomainModule {
}