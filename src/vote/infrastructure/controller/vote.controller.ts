import { Body, Controller, Inject, Logger, Post, UseGuards, Req } from "@nestjs/common";
import { Roles } from "../../../api/src/auth/decorator/role.decorator";
import { AddVoteDto } from "../dto/add-vote.dto";
import { VoteAdapter } from "../../domain/port/vote-adapter";
import { IVoteAdapter } from "../../domain/adapter/vote-adapter.interface";
import { JwtAuthGuard } from "../../../api/src/auth/guard/jwt.guard";
import { RolesGuard } from "../../../api/src/auth/guard/role.guard";
import { Request } from 'express'

@Controller('/vote')
export class VoteController {
    logger = new Logger(VoteController.name)

    constructor(
        @Inject(VoteAdapter) private readonly voteAdapter: IVoteAdapter
    ) {
    }

    @Post('/add')
    @Roles('client')
    @UseGuards(JwtAuthGuard, RolesGuard)
    async addVote(
        @Body() voteParams: AddVoteDto,
        @Req() req: Request
    ) {
        try {
            const email = req.user['email']
            await this.voteAdapter.create({
                voterEmail: email,
                votedToEmail: voteParams.voteTo,
                score: voteParams.score
            })
        } catch (err) {
            this.logger.error(err.messag)
            throw err
        }
    }
}