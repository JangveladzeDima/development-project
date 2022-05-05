import {ICompany} from "../../entity/company.model";

export interface ICompanyRepository {
    create(companyParams: Partial<ICompany>): Promise<ICompany>

    updateCompany(params: { filter: {}, updatedParams: {} }): Promise<void>

    getCompany(params: { filter: {} }): Promise<ICompany>
}