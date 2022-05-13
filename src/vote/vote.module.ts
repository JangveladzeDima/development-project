import {Module} from "@nestjs/common";
import { VoteInfrastructureModule } from "./infrastructure/vote-infrastructure.module";

@Module({
    imports:[
        VoteInfrastructureModule
    ]
})
export class VoteModule {
}