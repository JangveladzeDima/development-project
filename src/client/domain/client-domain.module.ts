import { Module } from "@nestjs/common";
import { ClientAdapter } from "./adapter/client.adapter";
import { UserDatabaseModule } from "../../user/infrastructure/database/user-database.module";
import { AuthModule } from "../../auth/auth.module";
import { ClientDatabaseModule } from "../infrastructure/database/client-database.module";

@Module({
    imports: [
        UserDatabaseModule,
        ClientDatabaseModule,
        AuthModule
    ],
    providers: [ClientAdapter],
    exports: [ClientAdapter]
})
export class ClientDomainModule {
}