import {Module} from "@nestjs/common";
import {CompanyInfrastructureModule} from "./infrastructure/company-infrastructure.module";
import {CompanyDomainModule} from "./domain/company-domain.module";

@Module({
    imports: [
        CompanyInfrastructureModule,
        CompanyDomainModule
    ]
})
export class CompanyModule {
}