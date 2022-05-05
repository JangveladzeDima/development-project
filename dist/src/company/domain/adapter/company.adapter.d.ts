import { ICompanyAdapter } from "../port/company-adapter.interface";
import { CompanyRegistrationDto } from "../../infrastructure/dto/company-registration.dto";
import { ICompany } from "../../infrastructure/entity/company.model";
import { ICompanyRepository } from "../../infrastructure/database/port/company-repository.interface";
import { IUserAdapter } from "../../../user/domain/port/user-adapter.interface";
import { ICryptoHashService } from "../../../auth/service/port/crypto-hash-service.interface";
export declare class CompanyAdapter implements ICompanyAdapter {
    private readonly companyRepository;
    private readonly userAdapter;
    private readonly cryptoHashService;
    constructor(companyRepository: ICompanyRepository, userAdapter: IUserAdapter, cryptoHashService: ICryptoHashService);
    registration(registrationParams: CompanyRegistrationDto): Promise<ICompany>;
}
