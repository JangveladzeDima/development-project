import {Body, Controller, Get, Inject, Logger, Post, Req, UploadedFile, UseGuards} from "@nestjs/common";
import {CompanyRegistrationDto} from "../dto/company-registration.dto";
import {CompanyAdapter} from "../../domain/adapter/company.adapter";
import {ICompanyAdapter} from "../../domain/port/company-adapter.interface";
import {Roles} from "../../../auth/decorator/role.decorator";
import {JwtAuthGuard} from "../../../auth/guard/jwt.guard";
import {RolesGuard} from "../../../auth/guard/role.guard";
import {Request} from "express";
import {UseInterceptors} from "@nestjs/common";
import {FileInterceptor} from "@nestjs/platform-express";

@Controller('/company')
export class CompanyController {
    logger = new Logger(CompanyController.name)

    constructor(
        @Inject(CompanyAdapter) private readonly companyAdapter: ICompanyAdapter
    ) {
    }

    @Post('/register')
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

    @Get('/')
    @UseGuards(JwtAuthGuard, RolesGuard)
    async getCompany(@Req() req: Request) {
        try {

        } catch (err) {
            this.logger.error(err.message)
            throw err
        }
    }

    @Post('logo')
    @Roles('company')
    @UseGuards(JwtAuthGuard, RolesGuard)
    @UseInterceptors(FileInterceptor('file'))
    async addCompanyLogo(
        @Req() req: Request,
        @UploadedFile() file: Express.Multer.File
    ) {
        try {
            const logo = await this.companyAdapter.addCompanyLogo(file, req.user['email'])
            return {
                logo,
                message: 'ok'
            }
        } catch (err) {
            this.logger.error(err.message)
            throw err
        }
    }
}