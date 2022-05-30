import { Body, Controller, Get, Inject, Post, Query, UseInterceptors, UploadedFile } from "@nestjs/common";
import { CompanyService } from "../service/company/company.service";
import { ICompanyService } from "../service/company/company-service.interface";
import { CompanyRegistrationDto } from "../dto/company/company-registration.dto";
import { ICompanyRegistrationResponse } from "../interface/company/company-registration-response.interface";
import { ICompanyFilter } from "../interface/company/company-filter.interface";
import { ICompanyGetResponse } from "../interface/company/company-get-response.interface";
import { FileInterceptor } from "@nestjs/platform-express";
import { ICompanyLogo } from "../interface/company/company-logo.interface";
import { ICompany } from "../interface/company/company.model";

@Controller('/company')
export class CompanyController {
    constructor(
        @Inject(CompanyService) private readonly companyService: ICompanyService
    ) {
    }

    @Post('/registration')
    @UseInterceptors(FileInterceptor('file'))
    async companyRegistration(
        @Body() registrationParams: CompanyRegistrationDto,
        @UploadedFile() file: Express.Multer.File
    ): Promise<ICompanyRegistrationResponse> {
        try {
            const company: ICompany = await this.companyService.create(registrationParams)
            const logoLocation: ICompanyLogo = await this.companyService.addCompanyLogo({
                file,
                email: registrationParams.email
            })
            company.logo = logoLocation.logo
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

