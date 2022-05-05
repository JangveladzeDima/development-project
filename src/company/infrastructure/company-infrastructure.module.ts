import {Module} from "@nestjs/common";
import {CompanyDatabaseModule} from "./database/company-database.module";
import {CompanyController} from "./controller/company.controller";
import {CompanyDomainModule} from "../domain/company-domain.module";

@Module({
    imports: [
        CompanyDatabaseModule,
        CompanyDomainModule
    ],
    controllers: [CompanyController]
})
export class CompanyInfrastructureModule {
}