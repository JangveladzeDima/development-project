import { IUserAdapter } from "../port/user-adapter.interface";
import { CreateUserDto } from "../../infrastructure/dto/create-user.dto";
import { IUserRepository } from "../../infrastructure/database/port/user-repository.interface";
export declare class UserAdapter implements IUserAdapter {
    private readonly userRepository;
    constructor(userRepository: IUserRepository);
    create(createUserParams: CreateUserDto): Promise<void>;
}
