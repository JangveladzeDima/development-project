import { BadRequestException, Inject, Injectable } from "@nestjs/common";
import { ICompanyAdapter } from "../port/company-adapter.interface";
import { CompanyRegistrationDto } from "../../infrastructure/dto/company-registration.dto";
import { ICompany } from "../../infrastructure/entity/company/company.model";
import { CompanyRepository } from "../../infrastructure/database/repository/company.repository";
import { ICompanyRepository } from "../../infrastructure/database/port/company-repository.interface";
// import {UserAdapter} from "../../../../user/src/domain/adapter/user.adapter";
// import {IUserAdapter} from "../../../../user/src/domain/port/user-adapter.interface";
// import {CryptoHashService} from "../../../../api/src/auth/service/service/crypto-hash.service";
// import {ICryptoHashService} from "../../../../api/src/auth/service/port/crypto-hash-service.interface";
// import {S3Service} from "../../../../aws/s3/service/s3-service";
// import {IS3Service} from "../../../../aws/s3/port/s3-service.interface";
import { CompanyLogoRepository } from "../../infrastructure/database/repository/company-logo.repository";
import { ICompanyLogoRepository } from "../../infrastructure/database/port/company-logo-repository.interface";
import { ICompanyLogo } from "../../infrastructure/entity/logo/company-logo.model";
import { CompanyUpdateDto } from "../../infrastructure/dto/company-update.dto";
// import {UserRepository} from "../../../../user/src/infrastructure/database/repository/user.repository";
// import {IUserRepository} from "../../../../user/src/infrastructure/database/port/user-repository.interface";
// import {JwtAuthService} from "../../../../api/src/auth/service/service/jwt-auth.service";
// import {IJwtAuthService} from "../../../../api/src/auth/service/port/jwt--auth-service.interface";
import { ClientProxy } from "@nestjs/microservices";
import { firstValueFrom } from "rxjs";
import { ICompanyFilter } from "../../infrastructure/interface/company-filter.interface";

@Injectable()
export class CompanyAdapter implements ICompanyAdapter {
    constructor(
        @Inject(CompanyRepository) private readonly companyRepository: ICompanyRepository,
        @Inject(CompanyLogoRepository) private readonly companyLogoRepository: ICompanyLogoRepository,
        @Inject('USER_SERVICE') private readonly userService: ClientProxy
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
        // const { hash, salt } = await this.cryptoHashService.generateHashAndSalt(registrationParams.password)
        // const company = await this.companyRepository.create({
        //     ...registrationParams,
        //     password: hash,
        //     salt
        // })
        const newCompany = await this.companyRepository.create({
            ...registrationParams,
            password: 'dima',
            salt: "asdsasdasd"
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

    // async updateCompany(email, updateParams: CompanyUpdateDto): Promise<{ company: ICompany, access_token: string }> {
    //     let accessToken;
    //     if (updateParams.email !== undefined) {
    //         const user = await this.userRepository.getUser({
    //             filter: {
    //                 email: updateParams.email
    //             }
    //         })
    //         if (user !== null) {
    //             throw new BadRequestException('this email already exists')
    //         }
    //         await this.companyRepository.updateCompany({
    //             filter: {
    //                 email
    //             },
    //             updatedParams: {
    //                 email: updateParams.email
    //             }
    //         })
    //         await this.userRepository.updateUser({
    //             filter: {
    //                 email
    //             },
    //             updateParams: {
    //                 email: updateParams.email
    //             }
    //         })
    //         accessToken = await this.jwtAuthService.login({
    //             email: updateParams.email,
    //             role: 'company'
    //         })
    //         email = updateParams.email
    //         updateParams.email = undefined
    //     }
    //     if (updateParams.password !== undefined) {
    //         const {hash, salt} = await this.cryptoHashService.generateHashAndSalt(updateParams.password)
    //         await this.companyRepository.updateCompany({
    //             filter: {
    //                 email,
    //             },
    //             updatedParams: {
    //                 password: hash,
    //                 salt
    //             }
    //         })
    //         updateParams.password = undefined
    //     }
    //     await this.companyRepository.updateCompany({
    //         filter: {
    //             email
    //         },
    //         updatedParams: {
    //             ...updateParams
    //         }
    //     })
    //     const company = await this.companyRepository.getCompany({
    //         filter: {
    //             email
    //         }
    //     })
    //     let companyLogoProperties = await this.companyLogoRepository.getLogo({
    //         filter: {
    //             companyID: company.ID
    //         }
    //     })
    //     if (companyLogoProperties !== null) {
    //         company.logo = companyLogoProperties.logo
    //     }
    //     return {
    //         company,
    //         ...accessToken
    //     }
    // }

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

    // async getCompany(email: string): Promise<ICompany> {
    //     const company = await this.companyRepository.getCompany({
    //         filter: {
    //             email
    //         }
    //     })
    //     const {logo} = await this.companyLogoRepository.getLogo({
    //         filter: {
    //             companyID: company.ID
    //         }
    //     })
    //     company.logo = logo
    //     return company
    // }

    // async addCompanyLogo(file: Express.Multer.File, companyEmail): Promise<ICompanyLogo> {
    //     if (file === undefined) {
    //         throw new BadRequestException('bad file')
    //     }
    //     if (file.mimetype !== 'image/png') {
    //         throw new BadRequestException('file should by image or png')
    //     }
    //     const uploadedFileLocation = await this.s3Service.uploadFile({
    //         file,
    //         filename: companyEmail
    //     })
    //     const company = await this.companyRepository.getCompany({
    //         filter: {
    //             email: companyEmail
    //         }
    //     })
    //     const oldLogo = await this.companyLogoRepository.getLogo({
    //         filter: {
    //             companyID: company.ID
    //         }
    //     })
    //     if (oldLogo !== null) {
    //         return this.companyLogoRepository.updateLogo({
    //             companyID: company.ID
    //         }, {
    //             logo: uploadedFileLocation
    //         })
    //     }
    //     return this.companyLogoRepository.add({
    //         logo: uploadedFileLocation,
    //         companyID: company.ID
    //     })
    // }
}