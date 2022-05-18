import { Module } from "@nestjs/common";
import { VoteController } from "./controller/vote.controller";
import { VoteDomainModule } from "../domain/vote-domain.module";

@Module({
    imports: [
        VoteDomainModule
    ],
    controllers: [VoteController]
})
export class VoteInfrastructureModule {
}