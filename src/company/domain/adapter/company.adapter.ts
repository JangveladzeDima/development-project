import {BadRequestException, Inject, Injectable} from "@nestjs/common";
import {ICompanyAdapter} from "../port/company-adapter.interface";
import {CompanyRegistrationDto} from "../../infrastructure/dto/company-registration.dto";
import {ICompany} from "../../infrastructure/entity/company.model";
import {CompanyRepository} from "../../infrastructure/database/repository/company.repository";
import {ICompanyRepository} from "../../infrastructure/database/port/company-repository.interface";
import {UserAdapter} from "../../../user/domain/adapter/user.adapter";
import {IUserAdapter} from "../../../user/domain/port/user-adapter.interface";

@Injectable()
export class CompanyAdapter implements ICompanyAdapter {
    constructor(
        @Inject(CompanyRepository) private readonly companyRepository: ICompanyRepository,
        @Inject(UserAdapter) private readonly userAdapter: IUserAdapter
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
        const company = await this.companyRepository.create(registrationParams)
        const user = await this.userAdapter.create({
            parentID: company.ID,
            email: company.email,
            role: 'company'
        })
        await this.companyRepository.updateCompany({
            filter: {
                ID: company.ID
            },
            updatedParams: {
                user: user.ID
            }
        })
        return company
    }
}