import {Inject, Injectable} from "@nestjs/common";
import {IUserRepository} from "../port/user-repository.interface";
import {Repository} from "typeorm";
import {UserEntity} from "../../entity/user.entity";
import {IUser} from "../../entity/user.interface";
import {InjectRepository} from "@nestjs/typeorm";

@Injectable()
export class UserRepository implements IUserRepository {
    constructor(
        @InjectRepository(UserEntity) private readonly userRepository: Repository<UserEntity>
    ) {
    }

    async create(userParams) {
        return this.userRepository.save(userParams)
    }

    async getUser(params) {
        return this.userRepository.findOneBy(params.filter)
    }

    async updateUser(params: { filter: {}; updateParams: {} }): Promise<void> {
        await this.userRepository.update(params.filter, params.updateParams)
    }

}