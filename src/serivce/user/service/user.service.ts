import { Inject, Injectable } from "@nestjs/common";
import { IUserService } from "../port/user-service.interface";
import { DesignerRepository } from "../../../designer/infrastructure/database/repository/designer.repository";
import { IDesignerRepository } from "../../../designer/infrastructure/database/port/designer-repository.interface";
import { CompanyRepository } from "../../../company/infrastructure/database/repository/company.repository";
import { ICompanyRepository } from "../../../company/infrastructure/database/port/company-repository.interface";
import { ClientRepository } from "../../../client/infrastructure/database/repository/client.repository";
import { IClientRepository } from "../../../client/infrastructure/database/port/client-repository.interface";
import { IClient } from "../../../client/infrastructure/entity/client.model";
import { ICompany } from "../../../company/infrastructure/entity/company/company.model";
import { IDesigner } from "../../../designer/infrastructure/entity/designer.interface";

@Injectable()
export class UserService implements IUserService {
    constructor(
        @Inject(DesignerRepository) private readonly designerRepository: IDesignerRepository,
        @Inject(CompanyRepository) private readonly companyRepository: ICompanyRepository,
        @Inject(ClientRepository) private readonly clientRepository: IClientRepository
    ) {
    }

    async getUserByRole(filter: {}, role: string): Promise<IClient | ICompany | IDesigner> {
        if (role === 'designer') {
            return this.designerRepository.getDesigner({
                filter
            })
        }
        if (role === 'company') {
            return this.companyRepository.getCompany(({
                filter
            }))
        }
        if (role === 'client') {
            return this.clientRepository.getClient({
                filter
            })
        }
    }

    async updateUserByRole(filter: {}, updateParams: {}, role: string): Promise<void> {
        if (role === 'designer') {
            await this.designerRepository.updateDesignerProfile({
                filter,
                updateParams
            })
        }
        if (role === 'company') {
            await this.companyRepository.updateCompany({
                filter,
                updatedParams: updateParams
            })
        }
        if (role == 'client') {
            await this.clientRepository.update(filter, updateParams)
        }
    }
}