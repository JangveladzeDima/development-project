import { CompanyRegistrationDto } from "../../dto/company/company-registration.dto";
import { ICompany } from "../../interface/company/company.model";
import { ICompanyFilter } from "../../interface/company/company-filter.interface";

export interface ICompanyService {
    create(companyParams: CompanyRegistrationDto): Promise<ICompany>

    getCompany(filter: ICompanyFilter): Promise<ICompany>
}