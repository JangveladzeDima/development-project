import { ICompanyRepository } from "../port/company-repository.interface";
import { CompanyEntity } from "../../entity/copmany.entity";
import { Repository } from "typeorm";
import { ICompany } from "../../entity/company.model";
export declare class CompanyRepository implements ICompanyRepository {
    private readonly companyRepository;
    constructor(companyRepository: Repository<CompanyEntity>);
    create(companyParams: Partial<ICompany>): Promise<ICompany>;
}
