import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { VotesRepository } from "./repository/votes.repository";
import { VotesEntity } from "../entity/vote.entity";

@Module({
    imports: [
        TypeOrmModule.forFeature([VotesEntity]),
        Repository
    ],
    providers: [VotesRepository],
    exports: [VotesRepository]
})
export class VoteDatabaseModule {
}