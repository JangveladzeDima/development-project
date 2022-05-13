import { Controller, Logger, Post } from "@nestjs/common";
import { Roles } from "../../../auth/decorator/role.decorator";

@Controller('/vote')
export class VoteController {
    logger = new Logger(VoteController.name)

    @Post('/add')
    @Roles('client')
    async addVote() {
        try {

        } catch (err) {
            this.logger.error(err.messag)
            throw err
        }
    }
}