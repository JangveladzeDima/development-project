import {Module} from "@nestjs/common";
import {DatabaseModule} from "./database/database.module";
import {UserController} from "./controller/user.controller";
import {DomainModule} from "../domain/domain.module";
import {ApplicationModule} from "../application/application.module";
import {AuthModule} from "../../auth/auth.module";

@Module({
    imports: [
        DatabaseModule,
        DomainModule,
        ApplicationModule,
        AuthModule
    ],
    controllers: [UserController]
})
export class InfrastructureModule {
}