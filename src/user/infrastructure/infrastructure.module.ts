import {Module} from "@nestjs/common";
import {DatabaseModule} from "./database/database.module";
import {UserController} from "./controller/user.controller";
import {DomainModule} from "../domain/domain.module";
import {ApplicationModule} from "../application/application.module";

@Module({
    imports: [
        DatabaseModule,
        DomainModule,
        ApplicationModule
    ],
    controllers: [UserController]
})
export class InfrastructureModule {
}