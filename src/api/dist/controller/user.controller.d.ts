import { Logger } from "@nestjs/common";
import { CreateUserDto } from "../dto/user/create-user.dto";
import { LoginUserDto } from "../dto/user/login-user.dto";
import { IUserCreateResponse } from "../interface/user/user-create-response.interface";
import { IUserService } from "../service/user-service.interface";
export declare class UserController {
    private readonly userService;
    logger: Logger;
    constructor(userService: IUserService);
    create(createUserParams: CreateUserDto): Promise<IUserCreateResponse>;
    getUser(ID?: number, email?: string, parentID?: number, role?: string): Promise<IUserCreateResponse>;
    userLogin(loginParams: LoginUserDto): Promise<void>;
}
