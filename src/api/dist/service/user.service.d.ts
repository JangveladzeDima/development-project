import { CreateUserDto } from "../dto/user/create-user.dto";
import { ClientProxy } from "@nestjs/microservices";
import { IUser } from "../interface/user/user.interface";
import { IUserService } from "./user-service.interface";
import { IUserFilter } from "../interface/user/user-filter.interface";
export declare class UserService implements IUserService {
    private readonly userService;
    constructor(userService: ClientProxy);
    create(createUserParams: CreateUserDto): Promise<IUser>;
    getUser(filter: IUserFilter): Promise<IUser>;
}
