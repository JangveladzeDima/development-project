import { IUserRepository } from "../port/user-repository.interface";
import { Repository } from "typeorm";
import { UserEntity } from "../../entity/user.entity";
import { IUserFilter } from "../../interface/user-filter.interface";
export declare class UserRepository implements IUserRepository {
    private readonly userRepository;
    constructor(userRepository: Repository<UserEntity>);
    create(userParams: any): Promise<any>;
    getUser(params: {
        filter: IUserFilter;
    }): Promise<UserEntity>;
    updateUser(params: {
        filter: {};
        updateParams: {};
    }): Promise<void>;
}
