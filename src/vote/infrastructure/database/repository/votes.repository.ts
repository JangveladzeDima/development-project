import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { IVotesRepository } from "../port/votes-repository.interface";
import { VotesEntity } from "../../entity/vote.entity";
import { IVotes } from "../../entity/vote.interface";
import { IVotesFilter } from "../../interface/vote-filter.interface";

@Injectable()
export class VotesRepository implements IVotesRepository {
    constructor(
        @InjectRepository(VotesEntity) private readonly companyVoteRepository: Repository<VotesEntity>
    ) {
    }

    async create(vote: IVotes): Promise<IVotes> {
        return this.companyVoteRepository.save(vote)
    }

    async getVote(params: { filter: IVotesFilter }): Promise<IVotes> {
        return this.companyVoteRepository.findOneBy(params.filter)
    }

    async updateVote(params: { filter: IVotesFilter; updateParams: { score: number } }): Promise<void> {
        await this.companyVoteRepository.update(params.filter, params.updateParams)
    }
}