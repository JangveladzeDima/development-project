import { Module } from "@nestjs/common";
import { VoteAdapter } from "./port/vote-adapter";
import { VoteDatabaseModule } from "../infrastructure/database/vote-database.module";
import { UserDatabaseModule } from "../../user/infrastructure/database/user-database.module";
import { ServiceModule } from "../../serivce/service.module";

@Module({
    imports: [
        VoteDatabaseModule,
        UserDatabaseModule,
        ServiceModule
    ],
    providers: [VoteAdapter],
    exports: [VoteAdapter]
})
export class VoteDomainModule {
}