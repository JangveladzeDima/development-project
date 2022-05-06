import {Body, Controller, Inject, Logger, Post, Req, UploadedFile, UseGuards} from "@nestjs/common";
import {CompanyRegistrationDto} from "../dto/company-registration.dto";
import {CompanyAdapter} from "../../domain/adapter/company.adapter";
import {ICompanyAdapter} from "../../domain/port/company-adapter.interface";
import {Roles} from "../../../auth/decorator/role.decorator";
import {JwtAuthGuard} from "../../../auth/guard/jwt.guard";
import {RolesGuard} from "../../../auth/guard/role.guard";
import {Request} from "express";
import {UseInterceptors} from "@nestjs/common";
import {FileInterceptor} from "@nestjs/platform-express";
import {diskStorage} from "multer";

const storage = {
    storage: diskStorage({
        destination: './uploads/companyLogo',
        filename: (req, file, cb) => {
            console.log(req.user['email'])
            const filename: string = 'dima'
            const extension: string = '.png'
            cb(null, `${filename}${extension}`)
        }
    })
}

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

    @Post('upload')
    @Roles('company')
    @UseGuards(JwtAuthGuard, RolesGuard)
    @UseInterceptors(FileInterceptor('file', storage))
    async addCompanyLogo(
        @Req() req: Request,
        @UploadedFile() file: Express.Multer.File
    ) {
        try {
            // unda aitvirtos aws ze
            // const email = req.user['email']
            console.log(file)
            return {
                // file: file.buffer.toString('base64')
                // file.buffer.toString()
            }
        } catch (err) {
            this.logger.error(err.message)
            throw err
        }
    }
}