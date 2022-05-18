import { BadRequestException, Inject, Injectable } from "@nestjs/common";
import { IVoteAdapter } from "../adapter/vote-adapter.interface";
import { IVoteCreate } from "../../../company/infrastructure/interface/vote-create.interface";
import { IVotes } from "../../infrastructure/entity/vote.interface";
import {IUserRepository} from "../../../user/src/infrastructure/database/port/user-repository.interface";
import { UserRepository } from "../../../user/src/infrastructure/database/repository/user.repository";
import { VotesRepository } from "../../infrastructure/database/repository/votes.repository";
import { IVotesRepository } from "../../infrastructure/database/port/votes-repository.interface";
import { IUser } from "../../../user/src/infrastructure/entity/user.interface";
import { UserService } from "../../../serivce/user/service/user.service";
import { IUserService } from "../../../serivce/user/port/user-service.interface";

@Injectable()
export class VoteAdapter implements IVoteAdapter {
    constructor(
        @Inject(UserRepository) private readonly userRepository: IUserRepository,
        @Inject(VotesRepository) private readonly votesRepository: IVotesRepository,
        @Inject(UserService) private readonly userService: IUserService
    ) {
    }

    async create(createVoteParams: IVoteCreate): Promise<IVotes> {
        const { votedToEmail, voterEmail, score } = createVoteParams
        if (score < 0 || score > 5) {
            throw new BadRequestException('score should by less then 5 and big then 0')
        }
        if (votedToEmail === voterEmail) {
            throw new BadRequestException('voting for yourself is prohibited')
        }
        const votedTo = await this.userRepository.getUser({
            filter: {
                email: votedToEmail
            }
        })
        if (!votedTo) {
            throw new BadRequestException('user dont exists')
        }
        if (votedTo.role === 'client') {
            throw new BadRequestException('voting for the client is prohibited')
        }
        const voter = await this.userRepository.getUser({
            filter: {
                email: voterEmail
            }
        })
        const lastVote = await this.votesRepository.getVote({
            filter: {
                voterID: voter.ID,
                votedToID: votedTo.ID
            }
        })
        if (!lastVote) {
            const vote = await this.votesRepository.create({
                voterID: voter.ID,
                votedToID: votedTo.ID,
                score
            })
            await this.addScore(votedTo, score, 0)
            return vote
        }
        await this.votesRepository.updateVote({
            filter: {
                voterID: voter.ID,
                votedToID: votedTo.ID,
            },
            updateParams: {
                score
            }
        })
        await this.addScore(votedTo, score, lastVote.score)
        return this.votesRepository.getVote({
            filter: {
                voterID: voter.ID,
                votedToID: votedTo.ID,
            }
        })
    }

    async addScore(user: IUser, score: number, lastScore: number) {
        const { role } = user
        const userByRole = await this.userService.getUserByRole({ email: user.email }, user.role)
        const rating = userByRole['rating']
        const newRating = rating - lastScore + score
        await this.userService.updateUserByRole({ email: user.email }, { rating: newRating }, role)

    }
}
