import {Module} from "@nestjs/common";
import {UserInfrastructureModule} from "./infrastructure/user-infrastructure.module";
import {UserDomainModule} from "./domain/user-domain.module";
import {AuthModule} from "../auth/auth.module";

@Module({
    imports: [
        AuthModule,
        UserInfrastructureModule,
        UserDomainModule
    ]
})
export class UserModule {
}