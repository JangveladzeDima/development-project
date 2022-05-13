import { Module } from "@nestjs/common";
import { ClientController } from "./controller/client.controller";
import { ClientDomainModule } from "../domain/client-domain.module";

@Module({
    imports: [
        ClientDomainModule
    ],
    providers: [],
    controllers: [ClientController]
})
export class ClientInfrastructureModule {
}