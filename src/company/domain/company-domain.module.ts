import {Module} from "@nestjs/common";
import {CompanyDatabaseModule} from "../infrastructure/database/company-database.module";
import {CompanyAdapter} from "./adapter/company.adapter";
import {UserDomainModule} from "../../user/domain/user-domain.module";
import {AuthModule} from "../../auth/auth.module";

@Module({
    imports: [
        CompanyDatabaseModule,
        UserDomainModule,
        AuthModule,
    ],
    providers: [CompanyAdapter],
    exports: [CompanyAdapter]
})
export class CompanyDomainModule {
}