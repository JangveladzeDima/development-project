import {Injectable} from "@nestjs/common";
import {ICompanyRepository} from "../port/company-repository.interface";
import {InjectRepository} from "@nestjs/typeorm";
import {CompanyEntity} from "../../entity/copmany.entity";
import {Repository} from "typeorm";
import {ICompany} from "../../entity/company.model";

@Injectable()
export class CompanyRepository implements ICompanyRepository {
    constructor(
        @InjectRepository(CompanyEntity) private readonly companyRepository: Repository<CompanyEntity>
    ) {
    }

    async create(companyParams: Partial<ICompany>): Promise<ICompany> {
        return this.companyRepository.save(companyParams)
    }
}
