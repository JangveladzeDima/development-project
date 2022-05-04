import {Module} from "@nestjs/common";
import {InfrastructureModule} from "./infrastructure/infrastructure.module";
import {ApplicationModule} from "./application/application.module";
import {DomainModule} from "./domain/domain.module";

@Module({
    imports: [
        InfrastructureModule,
        ApplicationModule,
        DomainModule
    ]
})
export class UserModule {
}