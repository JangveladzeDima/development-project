import {Module} from "@nestjs/common";
import {UserDatabaseModule} from "./database/user-database.module";
import {UserController} from "./controller/user.controller";
import {UserDomainModule} from "../domain/user-domain.module";
import {AuthModule} from "../../auth/auth.module";

@Module({
    imports: [
        UserDatabaseModule,
        UserDomainModule,
        AuthModule
    ],
    controllers: [UserController]
})
export class UserInfrastructureModule {
}