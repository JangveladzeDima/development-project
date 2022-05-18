import { IUserRepository } from "../../infrastructure/database/port/user-repository.interface";
import { IUser } from "../../infrastructure/entity/user.interface";
import { IUserAdapter } from "../port/user-adapter.interface";
import { IUserFilter } from "../../infrastructure/interface/user-filter.interface";
export declare class UserAdapter implements IUserAdapter {
    private readonly userRepository;
    constructor(userRepository: IUserRepository);
    create(createUserParams: any): Promise<IUser>;
    getUser(filter: IUserFilter): Promise<IUser>;
}
