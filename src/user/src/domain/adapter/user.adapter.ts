import { BadRequestException, HttpException, HttpStatus, Inject, Injectable } from "@nestjs/common";
import { UserRepository } from "../../infrastructure/database/repository/user.repository";
import { IUserRepository } from "../../infrastructure/database/port/user-repository.interface";
import { IUser } from "../../infrastructure/entity/user.interface";
import { AvailableRoles } from "../../infrastructure/constants/available-roles";
import { IUserAdapter } from "../port/user-adapter.interface";

//
@Injectable()
export class UserAdapter implements IUserAdapter {
    constructor(
           @Inject(UserRepository) private readonly userRepository: IUserRepository
//         @Inject(CryptoHashService) private readonly cryptoHashService: ICryptoHashService,
//         @Inject(DesignerRepository) private readonly designerRepository: IDesignerRepository,
//         @Inject(CompanyRepository) private readonly companyRepository: ICompanyRepository,
//         @Inject(JwtAuthService) private readonly jwtAuthService: IJwtAuthService,
//         @Inject(ClientRepository) private readonly clientRepository: IClientRepository,
//         @Inject(UserService) private readonly userService: IUserService
    ) {
    }

//
    async create(createUserParams): Promise<IUser> {
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

//
//     async getUser(filter: IUserFilter): Promise<IUser> {
//         const user = await this.userRepository.getUser({
//             filter
//         })
//         if (user === null) {
//             throw new BadRequestException('user dont exists')
//         }
//         return user
//     }
//
//     async userLogin(loginParams: LoginUserDto): Promise<{ access_token: string }> {
//         const user = await this.userRepository.getUser({
//             filter: {
//                 email: loginParams.email
//             }
//         })
//         if (user === null) {
//             throw new BadRequestException('email dont correct')
//         }
//         const { role } = user
//         const userByRole = await this.userService.getUserByRole({ email: loginParams.email }, role) //update
//         const { password, salt } = userByRole
//         const hashedPassword = await this.cryptoHashService.generateHashBySalt(loginParams.password, salt)
//         if (password !== hashedPassword) {
//             throw new BadRequestException('password not correct')
//         }
//         return this.jwtAuthService.login({
//             email: loginParams.email,
//             role
//         })
//     }
}