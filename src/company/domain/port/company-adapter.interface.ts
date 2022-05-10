import {CompanyRegistrationDto} from "../../infrastructure/dto/company-registration.dto";
import {ICompany} from "../../infrastructure/entity/company/company.model";
import {ICompanyLogo} from "../../infrastructure/entity/logo/company-logo.model";

export interface ICompanyAdapter {
    registration(registrationParams: CompanyRegistrationDto): Promise<ICompany>

    addCompanyLogo(file: Express.Multer.File, accessToken: string): Promise<ICompanyLogo>
}