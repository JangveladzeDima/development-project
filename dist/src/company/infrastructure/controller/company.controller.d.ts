import { Logger } from "@nestjs/common";
import { CompanyRegistrationDto } from "../dto/company-registration.dto";
import { ICompanyAdapter } from "../../domain/port/company-adapter.interface";
export declare class CompanyController {
    private readonly companyAdapter;
    logger: Logger;
    constructor(companyAdapter: ICompanyAdapter);
    companyRegistration(registrationParams: CompanyRegistrationDto): Promise<{
        company: import("../entity/company.model").ICompany;
        message: string;
    }>;
}
