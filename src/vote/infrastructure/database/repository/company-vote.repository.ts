import {Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {CompanyVoteEntity} from "../../entity/company-vote/company-vote.entity";
import {ICompanyVoteRepository} from "../port/company-vote-repository.interface";
import {Repository} from "typeorm";
import {ICompanyVote} from "../../entity/company-vote/company-vote.interface";

@Injectable()
export class CompanyVoteRepository implements ICompanyVoteRepository {
    constructor(
        @InjectRepository(CompanyVoteEntity) private readonly companyVoteRepository: Repository<CompanyVoteEntity>
    ) {
    }

    async create(companyVote: ICompanyVote): Promise<ICompanyVote> {
        return this.companyVoteRepository.save(companyVote)
    }
}