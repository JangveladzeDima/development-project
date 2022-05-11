import {Module} from "@nestjs/common";
import {TypeOrmModule} from "@nestjs/typeorm";
import {CompanyVoteEntity} from "../entity/company-vote/company-vote.entity";
import {Repository} from "typeorm";
import {CompanyVoteRepository} from "./repository/company-vote.repository";

@Module({
    imports: [
        TypeOrmModule.forFeature([CompanyVoteEntity]),
        Repository
    ],
    providers: [CompanyVoteRepository],
    exports: [CompanyVoteRepository]
})
export class VoteDatabaseModule {
}