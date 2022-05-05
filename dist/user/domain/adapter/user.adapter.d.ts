import { IUserAdapter } from "../port/user-adapter.interface";
import { CreateUserDto } from "../../infrastructure/dto/create-user.dto";
import { IUserRepository } from "../../infrastructure/database/port/user-repository.interface";
import { IUser } from "../../infrastructure/entity/user.interface";
import { ICryptoHashService } from "../../../auth/service/port/crypto-hash-service.interface";
export declare class UserAdapter implements IUserAdapter {
    private readonly cryptoHashService;
    private readonly userRepository;
    constructor(cryptoHashService: ICryptoHashService, userRepository: IUserRepository);
    create(createUserParams: CreateUserDto): Promise<IUser>;
    getUser(filter: {}): Promise<IUser>;
}
