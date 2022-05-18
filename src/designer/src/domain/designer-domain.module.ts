import { Module } from "@nestjs/common";
import { DesignerAdapter } from "./adapter/designer.adapter";
import { DesignerDatabaseModule } from "../infrastructure/database/designer-database.module";
import { ClientsModule } from "@nestjs/microservices";
// import { UserDomainModule } from "../../../user/src/domain/user-domain.module";

// import {AuthModule} from "../../api/src/auth/auth.module";
import { Transport } from "@nestjs/microservices";

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
        DesignerDatabaseModule,

        // UserDomainModule,
        // AuthModule
    ],
    providers: [DesignerAdapter],
    exports: [DesignerAdapter]
})
export class DesignerDomainModule {
}