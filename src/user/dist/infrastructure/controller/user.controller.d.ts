import { RmqContext } from "@nestjs/microservices";
import { IUserAdapter } from "../../domain/port/user-adapter.interface";
export declare class UserController {
    private readonly userAdapter;
    constructor(userAdapter: IUserAdapter);
    create(user: any, context: RmqContext): Promise<import("../entity/user.interface").IUser>;
}
