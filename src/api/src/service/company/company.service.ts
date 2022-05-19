import { Inject, Injectable } from "@nestjs/common";
import { ICompanyService } from "./company-service.interface";
import { ClientProxy } from "@nestjs/microservices";
import { firstValueFrom } from "rxjs";

@Injectable()
export class CompanyService implements ICompanyService {
    constructor(
        @Inject('COMPANY_SERVICE') private readonly companyService: ClientProxy
    ) {
    }

    async create(companyParams) {
        const newCompany = await firstValueFrom(this.companyService.send('company-create', companyParams))
        return newCompany
    }
}