import {Module} from "@nestjs/common";
import {InfrastructureModule} from "./infrastructure/infrastructure.module";
import {UserDomainModule} from "./domain/user-domain.module";
import {AuthModule} from "../auth/auth.module";

@Module({
    imports: [
        AuthModule,
        InfrastructureModule,
        UserDomainModule
    ]
})
export class UserModule {
}