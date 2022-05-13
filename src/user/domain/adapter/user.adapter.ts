import { BadRequestException, HttpException, HttpStatus, Inject, Injectable } from "@nestjs/common";
import { IUserAdapter } from "../port/user-adapter.interface";
import { CreateUserDto } from "../../infrastructure/dto/create-user.dto";
import { UserRepository } from "../../infrastructure/database/repository/user.repository";
import { IUserRepository } from "../../infrastructure/database/port/user-repository.interface";
import { AvailableRoles } from "../../../common/constants/available-roles";
import { IUser } from "../../infrastructure/entity/user.interface";
import { CryptoHashService } from "../../../auth/service/service/crypto-hash.service";
import { ICryptoHashService } from "../../../auth/service/port/crypto-hash-service.interface";
import { LoginUserDto } from "../../infrastructure/dto/login-user.dto";
import { DesignerRepository } from "../../../designer/infrastructure/database/repository/designer.repository";
import { IDesignerRepository } from "../../../designer/infrastructure/database/port/designer-repository.interface";
import { JwtAuthService } from "../../../auth/service/service/jwt-auth.service";
import { IJwtAuthService } from "../../../auth/service/port/jwt--auth-service.interface";
import { CompanyRepository } from "../../../company/infrastructure/database/repository/company.repository";
import { ICompanyRepository } from "../../../company/infrastructure/database/port/company-repository.interface";
import { IUserFilter } from "../../infrastructure/interface/user-filter.interface";
import { ClientRepository } from "../../../client/infrastructure/database/repository/client.repository";
import { IClientRepository } from "../../../client/infrastructure/database/port/client-repository.interface";
import { UserService } from "../../../serivce/user/service/user.service";
import { IUserService } from "../../../serivce/user/port/user-service.interface";

@Injectable()
export class UserAdapter implements IUserAdapter {
    constructor(
        @Inject(CryptoHashService) private readonly cryptoHashService: ICryptoHashService,
        @Inject(UserRepository) private readonly userRepository: IUserRepository,
        @Inject(DesignerRepository) private readonly designerRepository: IDesignerRepository,
        @Inject(CompanyRepository) private readonly companyRepository: ICompanyRepository,
        @Inject(JwtAuthService) private readonly jwtAuthService: IJwtAuthService,
        @Inject(ClientRepository) private readonly clientRepository: IClientRepository,
        @Inject(UserService) private readonly userService: IUserService
    ) {
    }

    async create(createUserParams: CreateUserDto): Promise<IUser> {
        if (!AvailableRoles.includes(createUserParams.role)) {
            throw new HttpException('role dont correct', HttpStatus.BAD_REQUEST)
        }
        const userByID = await this.userRepository.getUser({
            filter: {
                parentID: createUserParams.parentID
            }
        })
        if (userByID !== null && userByID.role === createUserParams.role) {
            throw new BadRequestException('user already exists')
        }
        const userByEmail = await this.userRepository.getUser({
            filter: {
                email: createUserParams.email
            }
        })
        if (userByEmail !== null && userByEmail.email === createUserParams.email) {
            throw new BadRequestException('email already exists')
        }
        return this.userRepository.create(createUserParams)
    }

    async getUser(filter: IUserFilter): Promise<IUser> {
        const user = await this.userRepository.getUser({
            filter
        })
        if (user === null) {
            throw new BadRequestException('user dont exists')
        }
        return user
    }

    async userLogin(loginParams: LoginUserDto): Promise<{ access_token: string }> {
        const user = await this.userRepository.getUser({
            filter: {
                email: loginParams.email
            }
        })
        if (user === null) {
            throw new BadRequestException('email dont correct')
        }
        const { role } = user
        const userByRole = await this.userService.getUserByRole({ email: loginParams.email }, role) //update
        const { password, salt } = userByRole
        const hashedPassword = await this.cryptoHashService.generateHashBySalt(loginParams.password, salt)
        if (password !== hashedPassword) {
            throw new BadRequestException('password not correct')
        }
        return this.jwtAuthService.login({
            email: loginParams.email,
            role
        })
    }
}