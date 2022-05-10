import {BadRequestException, Inject, Injectable} from "@nestjs/common";
import {ICompanyAdapter} from "../port/company-adapter.interface";
import {CompanyRegistrationDto} from "../../infrastructure/dto/company-registration.dto";
import {ICompany} from "../../infrastructure/entity/company/company.model";
import {CompanyRepository} from "../../infrastructure/database/repository/company.repository";
import {ICompanyRepository} from "../../infrastructure/database/port/company-repository.interface";
import {UserAdapter} from "../../../user/domain/adapter/user.adapter";
import {IUserAdapter} from "../../../user/domain/port/user-adapter.interface";
import {CryptoHashService} from "../../../auth/service/service/crypto-hash.service";
import {ICryptoHashService} from "../../../auth/service/port/crypto-hash-service.interface";
import {S3Service} from "../../../aws/s3/service/s3-service";
import {IS3Service} from "../../../aws/s3/port/s3-service.interface";
import {CompanyLogoRepository} from "../../infrastructure/database/repository/company-logo.repository";
import {ICompanyLogoRepository} from "../../infrastructure/database/port/company-logo-repository.interface";
import {ICompanyLogo} from "../../infrastructure/entity/logo/company-logo.model";

@Injectable()
export class CompanyAdapter implements ICompanyAdapter {
    constructor(
        @Inject(CompanyRepository) private readonly companyRepository: ICompanyRepository,
        @Inject(UserAdapter) private readonly userAdapter: IUserAdapter,
        @Inject(CryptoHashService) private readonly cryptoHashService: ICryptoHashService,
        @Inject(S3Service) private readonly s3Service: IS3Service,
        @Inject(CompanyLogoRepository) private readonly companyLogoRepository: ICompanyLogoRepository
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
        const { hash, salt } = await this.cryptoHashService.generateHashAndSalt(registrationParams.password)
        const company = await this.companyRepository.create({
            ...registrationParams,
            password: hash,
            salt
        })
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
        return {
            ...company,
            user: user.ID
        }
    }

    async addCompanyLogo(file: Express.Multer.File, companyEmail): Promise<ICompanyLogo> {
        if (file.mimetype !== 'image/png') {
            throw new BadRequestException('file should by image or png')
        }
        const uploadedFileLocation = await this.s3Service.uploadFile({
            file,
            filename: companyEmail
        })
        const company = await this.companyRepository.getCompany({
            filter: {
                email: companyEmail
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
                logo: uploadedFileLocation
            })
        }
        return this.companyLogoRepository.add({
            logo: uploadedFileLocation,
            companyID: company.ID
        })
    }
}