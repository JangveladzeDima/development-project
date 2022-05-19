import { CompanyRegistrationDto } from "../../infrastructure/dto/company-registration.dto";
import { ICompany } from "../../infrastructure/entity/company/company.model";
// import {ICompanyLogo} from "../../infrastructure/entity/logo/company-logo.model";
// import {CompanyUpdateDto} from "../../infrastructure/dto/company-update.dto";

export interface ICompanyAdapter {
    registration(registrationParams: CompanyRegistrationDto): Promise<ICompany>

    // getCompany(email: string): Promise<ICompany>

    // updateCompany(email, updateParams: CompanyUpdateDto): Promise<{ company: ICompany, access_token: string }>

    // addCompanyLogo(file: Express.Multer.File, accessToken: string): Promise<ICompanyLogo>
}