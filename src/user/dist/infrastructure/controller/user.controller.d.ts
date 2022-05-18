import { IUserAdapter } from "../../domain/port/user-adapter.interface";
import { IUser } from "../entity/user.interface";
import { IUserFilter } from "../interface/user-filter.interface";
export declare class UserController {
    private readonly userAdapter;
    constructor(userAdapter: IUserAdapter);
    create(user: any): Promise<IUser>;
    getUser(filter: IUserFilter): Promise<IUser>;
}
