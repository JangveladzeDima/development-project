import {ICompany} from "../../entity/company.model";

export interface ICompanyRepository {
    create(companyParams: Partial<ICompany>): Promise<ICompany>
}