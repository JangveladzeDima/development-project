import {Module} from "@nestjs/common";
import {CompanyInfrastructureModule} from "./infrastructure/company-infrastructure.module";

@Module({
    imports: [CompanyInfrastructureModule]
})
export class CompanyModule {
}