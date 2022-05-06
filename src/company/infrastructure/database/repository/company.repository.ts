import {Injectable} from "@nestjs/common";
import {ICompanyRepository} from "../port/company-repository.interface";
import {InjectRepository} from "@nestjs/typeorm";
import {CompanyEntity} from "../../entity/company/copmany.entity";
import {Repository} from "typeorm";
import {ICompany} from "../../entity/company/company.model";

@Injectable()
export class CompanyRepository implements ICompanyRepository {
    constructor(
        @InjectRepository(CompanyEntity) private readonly companyRepository: Repository<CompanyEntity>
    ) {
    }

    async create(companyParams: Partial<ICompany>): Promise<ICompany> {
        return this.companyRepository.save(companyParams)
    }

    async updateCompany(params: { filter: {}; updatedParams: {} }): Promise<void> {
        await this.companyRepository.update(params.filter, params.updatedParams)
    }

    async getCompany(params: { filter: {} }): Promise<ICompany> {
        return this.companyRepository.findOneBy(params.filter)
    }
}
