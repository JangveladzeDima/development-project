import { Logger } from "@nestjs/common";
import { CreateUserDto } from "../dto/create-user.dto";
import { IUserAdapter } from "../../domain/port/user-adapter.interface";
import { JwtAuthService } from "../../../auth/service/service/jwt.service";
export declare class UserController {
    private readonly userAdapter;
    private readonly jwtService;
    logger: Logger;
    constructor(userAdapter: IUserAdapter, jwtService: JwtAuthService);
    create(createUserParams: CreateUserDto): Promise<{
        user: import("../entity/user.interface").IUser;
        message: string;
    }>;
    getUser(filter: {}): Promise<{
        user: import("../entity/user.interface").IUser;
        message: string;
    }>;
}
