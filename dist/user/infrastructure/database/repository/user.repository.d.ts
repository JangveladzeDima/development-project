import { IUserRepository } from "../port/user-repository.interface";
import { Repository } from "typeorm";
import { UserEntity } from "../../entity/user.entity";
export declare class UserRepository implements IUserRepository {
    private readonly userRepository;
    constructor(userRepository: Repository<UserEntity>);
    create(userParams: any): Promise<void>;
    getUser(params: any): Promise<UserEntity>;
}
