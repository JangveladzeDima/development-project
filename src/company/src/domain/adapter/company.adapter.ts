import { BadRequestException, Inject, Injectable } from "@nestjs/common";
import { ICompanyAdapter } from "../port/company-adapter.interface";
import { CompanyRegistrationDto } from "../../infrastructure/dto/company-registration.dto";
import { ICompany } from "../../infrastructure/entity/company/company.model";
import { CompanyRepository } from "../../infrastructure/database/repository/company.repository";
import { ICompanyRepository } from "../../infrastructure/database/port/company-repository.interface";
import { CompanyLogoRepository } from "../../infrastructure/database/repository/company-logo.repository";
import { ICompanyLogoRepository } from "../../infrastructure/database/port/company-logo-repository.interface";
import { ClientProxy } from "@nestjs/microservices";
import { firstValueFrom } from "rxjs";
import { ICompanyFilter } from "../../infrastructure/interface/company-filter.interface";
import { ICompanyLogo } from "../../infrastructure/entity/logo/company-logo.model";
import { ICompanyUpdate } from "../../infrastructure/interface/company-update.interface";
import { ICompanyLogoFilter } from "../../infrastructure/interface/company-logo-filter.interface";

@Injectable()
export class CompanyAdapter implements ICompanyAdapter {
    constructor(
        @Inject(CompanyRepository) private readonly companyRepository: ICompanyRepository,
        @Inject(CompanyLogoRepository) private readonly companyLogoRepository: ICompanyLogoRepository,
        @Inject('USER_SERVICE') private readonly userService: ClientProxy,
        @Inject('HASH_SERVICE') private readonly hashService: ClientProxy
    ) {
    }

    async registration(registrationParams: CompanyRegistrationDto): Promise<ICompany> {
        const companyByName = await this.companyRepository.getCompany({
            filter: {
                name: registrationParams.name
            }
        })
        if (companyByName !== null) {
            throw new BadRequestException('name already exists')
        }
        const companyByEmail = await this.companyRepository.getCompany({
            filter: {
                email: registrationParams.email
            }
        })
        if (companyByEmail !== null) {
            throw new BadRequestException('email already exists')
        }
        const {
            hash,
            salt
        } = await firstValueFrom(this.hashService.send('get-hash-and-salt-by-text', registrationParams.password))
        const newCompany = await this.companyRepository.create({
            ...registrationParams,
            password: hash,
            salt
        })
        const user = await firstValueFrom(this.userService.send('user-create', {
            parentID: newCompany.ID,
            email: newCompany.email,
            role: 'company'
        }))
        await this.companyRepository.updateCompany({
            filter: {
                ID: newCompany.ID
            },
            updatedParams: {
                user: user.ID
            }
        })
        return {
            ...newCompany,
            user: user.ID
        }
    }

    async addCompanyLogo(logoParams: ICompanyLogo): Promise<ICompanyLogo> {
        const company = await this.companyRepository.getCompany({
            filter: {
                ID: logoParams.companyID
            }
        })
        const oldLogo = await this.companyLogoRepository.getLogo({
            filter: {
                companyID: company.ID
            }
        })
        if (oldLogo !== null) {
            return this.companyLogoRepository.updateLogo({
                companyID: company.ID
            }, {
                logo: logoParams.logo
            })
        }
        return this.companyLogoRepository.add({
            logo: logoParams.logo,
            companyID: company.ID
        })
    }

    async updateCompany(updateParams: { updateCompanyEmail: string; updatedParams: ICompanyUpdate }): Promise<ICompany> {
        const { updatedParams } = updateParams
        const company = await this.companyRepository.getCompany({
            filter: {
                email: updateParams.updateCompanyEmail
            }
        })
        if (updatedParams.password) {
            const {
                hash,
                salt
            } = await firstValueFrom(this.hashService.send('get-hash-and-salt-by-text', updatedParams.password))

            updatedParams.salt = salt
            updatedParams.password = hash
        }
        if (updatedParams.logo) {
            await this.companyLogoRepository.updateLogo({
                companyID: company.ID
            }, {
                logo: updatedParams.logo
            })
            delete updatedParams.logo
        }
        await this.companyRepository.updateCompany({
            filter: {
                email: updateParams.updateCompanyEmail
            },
            updatedParams
        })
        return this.getCompany({
            ID: company.ID
        })
    }

    async getCompany(filter: ICompanyFilter): Promise<ICompany> {
        const company = await this.companyRepository.getCompany({
            filter
        })
        if (company === null) {
            throw new BadRequestException('company dont exists')
        }
        const logo = await this.companyLogoRepository.getLogo({
            filter: {
                companyID: company.ID
            }
        })
        if (logo !== null) {
            company.logo = logo.logo
        }
        return company
    }

    async getCompanyLogo(filter: ICompanyLogoFilter): Promise<ICompanyLogo> {
        return this.companyLogoRepository.getLogo({
            filter
        })
    }
}