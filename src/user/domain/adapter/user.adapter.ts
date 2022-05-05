import {BadRequestException, HttpException, HttpStatus, Inject, Injectable} from "@nestjs/common";
import {IUserAdapter} from "../port/user-adapter.interface";
import {CreateUserDto} from "../../infrastructure/dto/create-user.dto";
import {UserRepository} from "../../infrastructure/database/repository/user.repository";
import {IUserRepository} from "../../infrastructure/database/port/user-repository.interface";
import {AvailableRoles} from "../../../constants/available-roles";
import {IUser} from "../../infrastructure/entity/user.interface";
import {CryptoHashService} from "../../../auth/service/service/crypto-hash.service";
import {ICryptoHashService} from "../../../auth/service/port/crypto-hash-service.interface";

@Injectable()
export class UserAdapter implements IUserAdapter {
    constructor(
        @Inject(CryptoHashService) private readonly cryptoHashService: ICryptoHashService,
        @Inject(UserRepository) private readonly userRepository: IUserRepository
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

    async getUser(filter: {}): Promise<IUser> {
        const user = await this.userRepository.getUser({
            filter
        })
        if (user === null) {
            throw new BadRequestException('user dont exists')
        }
        return user
    }
}