import {CompanyRegistrationDto} from "../../infrastructure/dto/company-registration.dto";
import {ICompany} from "../../infrastructure/entity/company/company.model";

export interface ICompanyAdapter {
    registration(registrationParams: CompanyRegistrationDto): Promise<ICompany>
}