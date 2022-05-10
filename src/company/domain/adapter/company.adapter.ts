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
import {CompanyUpdateDto} from "../../infrastructure/dto/company-update.dto";
import {UserRepository} from "../../../user/infrastructure/database/repository/user.repository";
import {IUserRepository} from "../../../user/infrastructure/database/port/user-repository.interface";
import {JwtAuthService} from "../../../auth/service/service/jwt-auth.service";
import {IJwtAuthService} from "../../../auth/service/port/jwt--auth-service.interface";

@Injectable()
export class CompanyAdapter implements ICompanyAdapter {
    constructor(
        @Inject(CompanyRepository) private readonly companyRepository: ICompanyRepository,
        @Inject(UserAdapter) private readonly userAdapter: IUserAdapter,
        @Inject(CryptoHashService) private readonly cryptoHashService: ICryptoHashService,
        @Inject(S3Service) private readonly s3Service: IS3Service,
        @Inject(CompanyLogoRepository) private readonly companyLogoRepository: ICompanyLogoRepository,
        @Inject(UserRepository) private readonly userRepository: IUserRepository,
        @Inject(JwtAuthService) private readonly jwtAuthService: IJwtAuthService
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

    async updateCompany(email, updateParams: CompanyUpdateDto): Promise<{ company: ICompany, access_token: string }> {
        let accessToken;
        if (updateParams.email !== undefined) {
            const user = await this.userRepository.getUser({
                filter: {
                    email: updateParams.email
                }
            })
            if (user !== null) {
                throw new BadRequestException('this email already exists')
            }
            await this.companyRepository.updateCompany({
                filter: {
                    email
                },
                updatedParams: {
                    email: updateParams.email
                }
            })
            await this.userRepository.updateUser({
                filter: {
                    email
                },
                updateParams: {
                    email: updateParams.email
                }
            })
            accessToken = await this.jwtAuthService.login({
                email: updateParams.email,
                role: 'company'
            })
            email = updateParams.email
            updateParams.email = undefined
        }
        if (updateParams.password !== undefined) {
            const { hash, salt } = await this.cryptoHashService.generateHashAndSalt(updateParams.password)
            await this.companyRepository.updateCompany({
                filter: {
                    email,
                },
                updatedParams: {
                    password: hash,
                    salt
                }
            })
            updateParams.password = undefined
        }
        await this.companyRepository.updateCompany({
            filter: {
                email
            },
            updatedParams: {
                ...updateParams
            }
        })
        const company = await this.companyRepository.getCompany({
            filter: {
                email
            }
        })
        let companyLogoProperties = await this.companyLogoRepository.getLogo({
            filter: {
                companyID: company.ID
            }
        })
        if (companyLogoProperties !== null) {
            company.logo = companyLogoProperties.logo
        }
        return {
            company,
            ...accessToken
        }
    }

    async getCompany(email: string): Promise<ICompany> {
        const company = await this.companyRepository.getCompany({
            filter: {
                email
            }
        })
        const { logo } = await this.companyLogoRepository.getLogo({
            filter: {
                companyID: company.ID
            }
        })
        company.logo = logo
        return company
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