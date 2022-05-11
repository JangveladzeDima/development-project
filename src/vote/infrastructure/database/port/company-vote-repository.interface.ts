import {ICompanyVote} from "../../entity/company-vote/company-vote.interface";

export interface ICompanyVoteRepository {
    create(companyVote: ICompanyVote): Promise<ICompanyVote>
}