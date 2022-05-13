import {Module} from "@nestjs/common";
import {VoteController} from "./controller/vote.controller";

@Module({
    controllers: [VoteController]
})
export class VoteInfrastructureModule {
}