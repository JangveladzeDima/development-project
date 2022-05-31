import { CompanyRegistrationDto } from "../../infrastructure/dto/company-registration.dto";
import { ICompany } from "../../infrastructure/entity/company/company.model";
import { ICompanyFilter } from "../../infrastructure/interface/company-filter.interface";
import { ICompanyLogo } from "../../infrastructure/entity/logo/company-logo.model";
import { ICompanyUpdate } from "../../infrastructure/interface/company-update.interface";
import { ICompanyLogoFilter } from "../../infrastructure/interface/company-logo-filter.interface";

export interface ICompanyAdapter {
    registration(registrationParams: CompanyRegistrationDto): Promise<ICompany>

    getCompany(filter: ICompanyFilter): Promise<ICompany>

    addCompanyLogo(logoParams: ICompanyLogo): Promise<ICompanyLogo>

    updateCompany(updateParams: { updateCompanyEmail: string; updatedParams: ICompanyUpdate }): Promise<ICompany>

    getCompanyLogo(filter: ICompanyLogoFilter): Promise<ICompanyLogo>

    // addCompanyLogo(file: Express.Multer.File, accessToken: string): Promise<ICompanyLogo>
}