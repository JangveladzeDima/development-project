import { Module } from "@nestjs/common";
import { CompanyInfrastructureModule } from "./infrastructure/company-infrastructure.module";
import { ConfigModule } from '@nestjs/config'

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true
        }),
        CompanyInfrastructureModule,

    ]
})
export class CompanyModule {
}