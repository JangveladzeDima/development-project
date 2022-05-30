import { Injectable } from "@nestjs/common";
import { IUserRepository } from "../port/user-repository.interface";
import { Repository } from "typeorm";
import { UserEntity } from "../../entity/user.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { IUserFilter } from "../../interface/user-filter.interface";

@Injectable()
export class UserRepository implements IUserRepository {
    constructor(
        @InjectRepository(UserEntity) private readonly userRepository: Repository<UserEntity>
    ) {
    }

    async create(userParams) {
        console.log(userParams)
        return this.userRepository.save(userParams)
    }

    async getUser(params: { filter: IUserFilter }) {
        return this.userRepository.findOne({
            where: params.filter
        })
    }

    async updateUser(params: { filter: {}; updateParams: {} }): Promise<void> {
        await this.userRepository.update(params.filter, params.updateParams)
    }

}