import { Module } from "@nestjs/common";
import { UserInfrastructureModule } from "./infrastructure/user-infrastructure.module";
import { ConfigModule } from "@nestjs/config";

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true
        }),
        UserInfrastructureModule
    ]
})
export class UserModule {
}
