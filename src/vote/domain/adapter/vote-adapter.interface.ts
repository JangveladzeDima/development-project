import { IVoteCreate } from "../../../company/src/infrastructure/interface/vote-create.interface";
import { IVotes } from "../../infrastructure/entity/vote.interface";

export interface IVoteAdapter {
    create(createVoteParams: IVoteCreate): Promise<IVotes>
}