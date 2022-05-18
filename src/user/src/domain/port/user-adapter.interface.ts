import { IUser } from "../../infrastructure/entity/user.interface";
import { IUserFilter } from "../../infrastructure/interface/user-filter.interface";

export interface IUserAdapter {
    create(createUserParams): Promise<IUser>

    getUser(filter: IUserFilter): Promise<IUser>

//
//     userLogin(loginParams): Promise<{ access_token: string }>
}