import { CompanyRegistrationDto } from "../../dto/company/company-registration.dto";
import { ICompany } from "../../interface/company/company.model";
import { ICompanyFilter } from "../../interface/company/company-filter.interface";
import { ICompanyLogo } from "../../interface/company/company-logo.interface";
import { ICompanyUpdate } from "../../interface/company/company-update.interface";

export interface ICompanyService {
    create(companyParams: CompanyRegistrationDto): Promise<ICompany>

    getCompany(filter: ICompanyFilter): Promise<ICompany>

    addCompanyLogo(fileParams: { file: Express.Multer.File, email: string }): Promise<ICompanyLogo>

    updateCompany(updateParams: { updateCompanyEmail: string, updatedParams: ICompanyUpdate }): Promise<ICompany>
}