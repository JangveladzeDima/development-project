import { Module } from "@nestjs/common";
import { CompanyDatabaseModule } from "../infrastructure/database/company-database.module";
import { CompanyAdapter } from "./adapter/company.adapter";
import { ClientsModule, Transport } from "@nestjs/microservices";

@Module({
    imports: [
        ClientsModule.register([
            {
                name: 'USER_SERVICE',
                transport: Transport.RMQ,
                options: {
                    urls: ['amqp://guest:guest@localhost:5672'],
                    queue: 'user_queue',
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