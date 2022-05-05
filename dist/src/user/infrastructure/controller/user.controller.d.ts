import { Logger } from "@nestjs/common";
import { CreateUserDto } from "../dto/create-user.dto";
import { IUserAdapter } from "../../domain/port/user-adapter.interface";
import { LoginDto } from "../dto/login.dto";
export declare class UserController {
    private readonly userAdapter;
    logger: Logger;
    constructor(userAdapter: IUserAdapter);
    create(createUserParams: CreateUserDto): Promise<{
        user: import("../entity/user.interface").IUser;
        message: string;
    }>;
    userLogin(loginParams: LoginDto): Promise<{
        accessToken: {
            access_token: string;
        };
    }>;
    getUser(filter: {}): Promise<{
        user: import("../entity/user.interface").IUser;
        message: string;
    }>;
}
