import {Module} from "@nestjs/common";
import {UserAdapter} from "./adapter/user.adapter";
import {DatabaseModule} from "../infrastructure/database/database.module";
import {AuthModule} from "../../auth/auth.module";

@Module({
    imports: [
        AuthModule,
        DatabaseModule
    ],
    providers: [UserAdapter],
    exports: [UserAdapter]
})
export class DomainModule {
}