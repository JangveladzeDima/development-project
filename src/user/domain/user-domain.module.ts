import {Module} from "@nestjs/common";
import {UserAdapter} from "./adapter/user.adapter";
import {DatabaseModule} from "../infrastructure/database/database.module";

@Module({
    imports: [
        DatabaseModule
    ],
    providers: [UserAdapter],
    exports: [UserAdapter]
})
export class UserDomainModule {
}