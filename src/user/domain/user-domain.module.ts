import {Module} from "@nestjs/common";
import {UserAdapter} from "./adapter/user.adapter";
import {UserDatabaseModule} from "../infrastructure/database/user-database.module";
import {AuthModule} from "../../auth/auth.module";

@Module({
    imports: [
        UserDatabaseModule,
        AuthModule
    ],
    providers: [UserAdapter],
    exports: [UserAdapter]
})
export class UserDomainModule {
}