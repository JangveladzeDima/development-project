import { Module } from "@nestjs/common";
import { ClientInfrastructureModule } from "./infrastructure/client-infrastructure.module";

@Module({
    imports:[
        ClientInfrastructureModule
    ]
})
export class ClientModule{}