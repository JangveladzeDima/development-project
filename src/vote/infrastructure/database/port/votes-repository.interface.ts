import { IVotes } from "../../entity/vote.interface";
import { IVotesFilter } from "../../interface/vote-filter.interface";

export interface IVotesRepository {
    create(vote: IVotes): Promise<IVotes>

    getVote(params: { filter: IVotesFilter }): Promise<IVotes>

    updateVote(params: { filter: IVotesFilter, updateParams: { score: number } }): Promise<void>
}