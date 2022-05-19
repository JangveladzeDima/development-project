import {Module} from "@nestjs/common";
import {CompanyDatabaseModule} from "../infrastructure/database/company-database.module";
import {CompanyAdapter} from "./adapter/company.adapter";
import {ClientsModule, Transport} from "@nestjs/microservices";

// import {UserDomainModule} from "../../../user/src/domain/user-domain.module";
// import {AuthModule} from "../../../api/src/auth/auth.module";
// import {AwsS3Module} from "../../../aws/s3/aws-s3.module";
// import {UserDatabaseModule} from "../../../user/src/infrastructure/database/user-database.module";

@Module({
    imports: [
        ClientsModule.register([
            {
                name: 'COMPANY_SERVICE',
                transport: Transport.RMQ,
                options: {
                    urls: ['amqp://guest:guest@localhost:5672'],
                    queue: 'company_queue',
                    queueOptions: {
                        durable: false
                    }
                }
            }
        ]),
        CompanyDatabaseModule,

    ],
    providers: [CompanyAdapter],
    exports: [CompanyAdapter]
})
export class CompanyDomainModule {
}