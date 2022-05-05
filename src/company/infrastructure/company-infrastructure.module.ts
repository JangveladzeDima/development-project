import {Module} from "@nestjs/common";
import {CompanyDatabaseModule} from "./database/company-database.module";

@Module({
    imports:[CompanyDatabaseModule]
})
export class CompanyInfrastructureModule {
}