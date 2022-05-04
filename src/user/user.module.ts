import {Module} from "@nestjs/common";
import {InfrastructureModule} from "./infrastructure/infrastructure.module";
import {DomainModule} from "./domain/domain.module";
import {AuthModule} from "../auth/auth.module";

@Module({
    imports: [
        AuthModule,
        InfrastructureModule,
        DomainModule
    ]
})
export class UserModule {
}