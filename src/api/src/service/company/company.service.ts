import { HttpException, Inject, Injectable } from "@nestjs/common";
import { ICompanyService } from "./company-service.interface";
import { ClientProxy } from "@nestjs/microservices";
import { firstValueFrom } from "rxjs";
import { CompanyRegistrationDto } from "../../dto/company/company-registration.dto";
import { ICompany } from "../../interface/company/company.model";
import { ICompanyFilter } from "../../interface/company/company-filter.interface";

@Injectable()
export class CompanyService implements ICompanyService {
    constructor(
        @Inject('COMPANY_SERVICE') private readonly companyService: ClientProxy
    ) {
    }

    async create(companyParams: CompanyRegistrationDto): Promise<ICompany> {
        const company = await firstValueFrom(this.companyService.send('company-create', companyParams))
        if (company.hasOwnProperty('response')) {
            throw new HttpException(company['response']['message'], company['response']['statusCode'])
        }
        return company
    }


    async getCompany(filter: ICompanyFilter): Promise<ICompany> {
        const company = await firstValueFrom(this.companyService.send('company-get', filter))
        if (company.hasOwnProperty('response')) {
            throw new HttpException(company['response']['message'], company['response']['statusCode'])
        }
        return company
    }
}