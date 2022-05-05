import {Body, Controller, Inject, Logger, Post} from "@nestjs/common";
import {CompanyRegistrationDto} from "../dto/company-registration.dto";
import {CompanyAdapter} from "../../domain/adapter/company.adapter";
import {ICompanyAdapter} from "../../domain/port/company-adapter.interface";

@Controller('/company')
export class CompanyController {
    logger = new Logger(CompanyController.name)

    constructor(
        @Inject(CompanyAdapter) private readonly companyAdapter: ICompanyAdapter
    ) {
    }

    @Post('/registration')
    async companyRegistration(
        @Body() registrationParams: CompanyRegistrationDto
    ) {
        try {
            const company = await this.companyAdapter.registration(registrationParams)
            return {
                company,
                message: 'ok!'
            }
        } catch (err) {
            this.logger.error(err.message)
            throw err
        }
    }
}