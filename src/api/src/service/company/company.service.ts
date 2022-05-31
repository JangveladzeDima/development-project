import { HttpException, Inject, Injectable } from "@nestjs/common";
import { ICompanyService } from "./company-service.interface";
import { ClientProxy } from "@nestjs/microservices";
import { firstValueFrom } from "rxjs";
import { CompanyRegistrationDto } from "../../dto/company/company-registration.dto";
import { ICompany } from "../../interface/company/company.model";
import { ICompanyFilter } from "../../interface/company/company-filter.interface";
import { ICompanyLogo } from "../../interface/company/company-logo.interface";
import { ICompanyUpdate } from "../../interface/company/company-update.interface";

@Injectable()
export class CompanyService implements ICompanyService {
    constructor(
        @Inject('COMPANY_SERVICE') private readonly companyService: ClientProxy,
        @Inject('S3_SERVICE') private readonly s3Service: ClientProxy
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
        const company: ICompany = await firstValueFrom(this.companyService.send('company-get', filter))
        if (company.hasOwnProperty('response')) {
            throw new HttpException(company['response']['message'], company['response']['statusCode'])
        }
        return company
    }

    async addCompanyLogo(fileParams: { file: Express.Multer.File, email: string }): Promise<ICompanyLogo> {
        const { file, email } = fileParams
        const logoLocation = await firstValueFrom(this.s3Service.send('add-file', {
            file,
            filename: email
        }))
        const company: ICompany = await firstValueFrom(this.companyService.send('company-get', {
            email
        }))
        const logo: ICompanyLogo = await firstValueFrom(this.companyService.send('add-company-logo', {
            companyID: company.ID,
            logo: logoLocation
        }))
        return logo
    }

    async updateCompany(updateParams: { updateCompanyEmail: string, updatedParams: ICompanyUpdate }): Promise<ICompany> {
        const { updatedParams } = updateParams
        let logoLocation;
        if (updatedParams.logo) {
            logoLocation = await firstValueFrom(this.s3Service.send('add-file', {
                file: updatedParams.logo,
                filename: updateParams.updateCompanyEmail
            }))
        }
        const updatedCompany: ICompany = await firstValueFrom(this.companyService.send('update', {
            updateCompanyEmail: updateParams.updateCompanyEmail,
            updatedParams: {
                ...updatedParams,
                logo: logoLocation
            }
        }))
        if (updatedCompany.hasOwnProperty('response')) {
            throw new HttpException(updatedCompany['response']['message'], updatedCompany['response']['statusCode'])
        }
        return updatedCompany
    }
}