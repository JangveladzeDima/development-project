import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { ClientEntity } from "../entity/client.entity";
import { ClientRepository } from "./repository/client.repository";

@Module({
    imports: [
        TypeOrmModule.forFeature([ClientEntity]),
        Repository
    ],
    providers: [ClientRepository],
    exports: [ClientRepository]
})
export class ClientDatabaseModule {
}