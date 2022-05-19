import { Body, Controller, Inject, Post } from "@nestjs/common";
import { CompanyService } from "../service/company/company.service";
import { ICompanyService } from "../service/company/company-service.interface";

@Controller('/company')
export class CompanyController {
    constructor(
        @Inject(CompanyService) private readonly companyService: ICompanyService
    ) {
    }

    @Post('/registration')
    async companyRegistration(@Body() registrationParams) {
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
}

