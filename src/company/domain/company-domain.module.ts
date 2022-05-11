import {Module} from "@nestjs/common";
import {CompanyDatabaseModule} from "../infrastructure/database/company-database.module";
import {CompanyAdapter} from "./adapter/company.adapter";
import {UserDomainModule} from "../../user/domain/user-domain.module";
import {AuthModule} from "../../auth/auth.module";
import {AwsS3Module} from "../../aws/s3/aws-s3.module";
import {UserDatabaseModule} from "../../user/infrastructure/database/user-database.module";

@Module({
    imports: [
        CompanyDatabaseModule,
        UserDomainModule,
        AuthModule,
        AwsS3Module,
        UserDatabaseModule
    ],
    providers: [CompanyAdapter],
    exports: [CompanyAdapter]
})
export class CompanyDomainModule {
}