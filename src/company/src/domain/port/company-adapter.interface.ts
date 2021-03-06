import { CompanyRegistrationDto } from "../../infrastructure/dto/company-registration.dto";
import { ICompany } from "../../infrastructure/entity/company/company.model";
import { ICompanyFilter } from "../../infrastructure/interface/company-filter.interface";

export interface ICompanyAdapter {
    registration(registrationParams: CompanyRegistrationDto): Promise<ICompany>

    getCompany(filter: ICompanyFilter): Promise<ICompany>

    // updateCompany(email, updateParams: CompanyUpdateDto): Promise<{ company: ICompany, access_token: string }>

    // addCompanyLogo(file: Express.Multer.File, accessToken: string): Promise<ICompanyLogo>
}