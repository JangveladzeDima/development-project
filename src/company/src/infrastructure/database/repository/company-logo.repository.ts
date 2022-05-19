import {Injectable} from "@nestjs/common";
import {ICompanyLogoRepository} from "../port/company-logo-repository.interface";
import {ICompanyLogo} from "../../entity/logo/company-logo.model";
import {InjectRepository} from "@nestjs/typeorm";
import {CompanyLogoEntity} from "../../entity/logo/company-logo.entity";
import {Repository} from "typeorm";

@Injectable()
export class CompanyLogoRepository implements ICompanyLogoRepository {
    constructor(
        @InjectRepository(CompanyLogoEntity) private readonly companyLogoRepository: Repository<CompanyLogoEntity>
    ) {
    }

    async add(logoParams: ICompanyLogo): Promise<ICompanyLogo> {
        return this.companyLogoRepository.save(logoParams)
    }

    // async getLogo(params: { filter: {} }): Promise<ICompanyLogo> {
    //     return this.companyLogoRepository.findOneBy(params.filter)
    // }

    // async updateLogo(updatedLogo: {}, updateParams: {}): Promise<ICompanyLogo> {
    //     const logo = await this.companyLogoRepository.findOneBy(updatedLogo)
    //     return this.companyLogoRepository.save({
    //         ...logo,
    //         ...updateParams
    //     })
    // }
}