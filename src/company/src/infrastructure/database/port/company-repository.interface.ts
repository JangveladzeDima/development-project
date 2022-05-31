import { ICompany } from "../../entity/company/company.model";
import { ICompanyFilter } from "../../interface/company-filter.interface";
import { ICompanyUpdate } from "../../interface/company-update.interface";

export interface ICompanyRepository {
    create(companyParams: Partial<ICompany>): Promise<ICompany>

    updateCompany(params: { filter: ICompanyFilter, updatedParams: ICompanyUpdate }): Promise<void>

    getCompany(params: { filter: ICompanyFilter } ): Promise<ICompany>
}