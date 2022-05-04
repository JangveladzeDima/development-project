import {HttpException, HttpStatus, Inject, Injectable} from "@nestjs/common";
import {IUserAdapter} from "../port/user-adapter.interface";
import {CreateUserDto} from "../../infrastructure/dto/create-user.dto";
import {UserRepository} from "../../infrastructure/database/repository/user.repository";
import {IUserRepository} from "../../infrastructure/database/port/user-repository.interface";
import {AvailableRoles} from "../../infrastructure/constants/available-roles";

@Injectable()
export class UserAdapter implements IUserAdapter {
    constructor(
        @Inject(UserRepository) private readonly userRepository: IUserRepository
    ) {
    }

    async create(createUserParams: CreateUserDto): Promise<void> {
        if (!AvailableRoles.includes(createUserParams.role)) {
            throw new HttpException('role dont correct', HttpStatus.BAD_REQUEST)
        }
        const user = await this.userRepository.getUser({
            filter: {
                parentID: createUserParams.parentID
            }
        })
        if (user!==null && user.role === createUserParams.role) {
            throw new HttpException('user already exists', HttpStatus.BAD_REQUEST)
        }
        await this.userRepository.create(createUserParams)
    }
}