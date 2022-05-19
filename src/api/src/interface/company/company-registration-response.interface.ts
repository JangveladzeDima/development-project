import { ICompany } from "./company.model";

export interface ICompanyRegistrationResponse {
    company: ICompany,
    message: string
}