import { Controller, Get, Inject, Logger } from "@nestjs/common";
import { CompanyRegistrationDto } from "../dto/company-registration.dto";
import { CompanyAdapter } from "../../domain/adapter/company.adapter";
import { ICompanyAdapter } from "../../domain/port/company-adapter.interface";
import { Payload, Ctx, RmqContext, MessagePattern } from '@nestjs/microservices'
import { ICompanyFilter } from "../interface/company-filter.interface";

@Controller('/company')
export class CompanyController {
    logger = new Logger(CompanyController.name)

    constructor(
        @Inject(CompanyAdapter) private readonly companyAdapter: ICompanyAdapter
    ) {
    }

    @MessagePattern('company-create')
    async companyRegistration(
        @Payload() registrationParams: CompanyRegistrationDto, @Ctx() context: RmqContext
    ): Promise<any> {
        try {
            const company = await this.companyAdapter.registration(registrationParams)
            return company
        } catch (err) {
            this.logger.error(err.message)
            return err
        }
    }

    // @Post('logo')
    // @Roles('company')
    // @UseGuards(JwtAuthGuard)
    // @UseInterceptors(FileInterceptor('file'))
    // async addCompanyLogo(
    //     @Req() req: Request,
    //     @UploadedFile() file: Express.Multer.File
    // ) {
    //     try {
    //         const email = req.user['email']
    //         const logo = await this.companyAdapter.addCompanyLogo(file, email)
    //         return {
    //             logo,
    //             message: 'ok'
    //         }
    //     } catch (err) {
    //         this.logger.error(err.message)
    //         throw err
    //     }
    // }

    // @Put('/update')
    // @Roles('company')
    // @UseGuards(JwtAuthGuard, RolesGuard)
    // async updateCompany(
    //     @Req() req: Request,
    //     @Body() updateParams: CompanyUpdateDto
    // ) {
    //     try {
    //         const email = req.user['email']
    //         const updatedCompany = await this.companyAdapter.updateCompany(email, updateParams)
    //         return {
    //             ...updatedCompany,
    //             message: 'ok'
    //         }
    //     } catch (err) {
    //         this.logger.error(err.message)
    //         throw err
    //     }
    // }

    @Get('/')
    @MessagePattern('company-get')
    async getCompany(@Payload() filter: ICompanyFilter) {
        try {
            const company = await this.companyAdapter.getCompany(filter)
            return company
        } catch (err) {
            this.logger.error(err.message)
            throw err
        }
    }
}