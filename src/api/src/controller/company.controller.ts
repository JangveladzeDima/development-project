import { Body, Controller, Get, Inject, Post, Query } from "@nestjs/common";
import { CompanyService } from "../service/company/company.service";
import { ICompanyService } from "../service/company/company-service.interface";
import { CompanyRegistrationDto } from "../dto/company/company-registration.dto";
import { ICompanyRegistrationResponse } from "../interface/company/company-registration-response.interface";
import { ICompanyFilter } from "../interface/company/company-filter.interface";
import { ICompanyGetResponse } from "../interface/company/company-get-response.interface";

@Controller('/company')
export class CompanyController {
    constructor(
        @Inject(CompanyService) private readonly companyService: ICompanyService
    ) {
    }

    @Post('/registration')
    async companyRegistration(@Body() registrationParams: CompanyRegistrationDto): Promise<ICompanyRegistrationResponse> {
        try {
            const company = await this.companyService.create(registrationParams)
            return {
                company,
                message: 'ok'
            }
        } catch (err) {
            throw err
        }
    }

    @Get('')
    async getCompany(@Query() filter: ICompanyFilter): Promise<ICompanyGetResponse> {
        try {
            const company = await this.companyService.getCompany(filter)
            return {
                company,
                message: 'ok'
            }
        } catch (err) {
            throw err
        }
    }
}

