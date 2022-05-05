import {Module} from "@nestjs/common";
import {DatabaseModule} from "./database/database.module";
import {UserController} from "./controller/user.controller";
import {UserDomainModule} from "../domain/user-domain.module";
import {ApplicationModule} from "../application/application.module";

@Module({
    imports: [
        DatabaseModule,
        UserDomainModule,
        ApplicationModule
    ],
    controllers: [UserController]
})
export class InfrastructureModule {
}