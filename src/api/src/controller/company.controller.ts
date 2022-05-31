import {
    Body,
    Controller,
    Get,
    Inject,
    Post,
    Query,
    UseInterceptors,
    UploadedFile,
    Put,
    Logger,
    Req, UseGuards
} from "@nestjs/common";
import { CompanyService } from "../service/company/company.service";
import { ICompanyService } from "../service/company/company-service.interface";
import { CompanyRegistrationDto } from "../dto/company/company-registration.dto";
import { ICompanyRegistrationResponse } from "../interface/company/company-registration-response.interface";
import { ICompanyFilter } from "../interface/company/company-filter.interface";
import { ICompanyGetResponse } from "../interface/company/company-get-response.interface";
import { FileInterceptor } from "@nestjs/platform-express";
import { ICompanyLogo } from "../interface/company/company-logo.interface";
import { ICompany } from "../interface/company/company.model";
import { JwtAuthGuard } from "../auth/guard/jwt.guard";
import { RolesGuard } from "../auth/guard/role.guard";
import { Roles } from "../auth/decorator/role.decorator";
import { Request } from "express";
import { UpdateInterceptor } from "../interceptor/update.interceptor";
import { CompanyUpdateDto } from "../dto/company/company-update.dto";

@Controller('/company')
export class CompanyController {
    logger = new Logger()

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
            this.logger.error(err.message)
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

    @Put('update')
    @Roles('company')
    @UseGuards(JwtAuthGuard, RolesGuard)
    @UseInterceptors(new UpdateInterceptor(), FileInterceptor('file'))
    async updateCompany(
        @Query('updateParams') updateParams: CompanyUpdateDto,
        @UploadedFile() file: Express.Multer.File,
        @Req() req: Request
    ) {
        try {
            const email = req['user']['email']
            const updatedCompany = await this.companyService.updateCompany({
                updateCompanyEmail: email,
                updatedParams: {
                    ...updateParams,
                    logo: file
                }
            })
            return {
                company: updatedCompany,
                message: 'ok'
            }
        } catch (err) {
            this.logger.error(err.message)
            throw err
        }
    }
}

