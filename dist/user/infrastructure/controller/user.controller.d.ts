import { Logger } from "@nestjs/common";
import { CreateUserDto } from "../dto/create-user.dto";
import { IUserAdapter } from "../../domain/port/user-adapter.interface";
export declare class UserController {
    private readonly userAdapter;
    logger: Logger;
    constructor(userAdapter: IUserAdapter);
    create(createUserParams: CreateUserDto): Promise<{
        message: string;
    }>;
}
