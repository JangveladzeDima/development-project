import {IUser} from "../../infrastructure/entity/user.interface";
export interface IUserAdapter {
    create(createUserParams): Promise<IUser>
//
//     getUser(filter: IUserFilter): Promise<IUser>
//
//     userLogin(loginParams): Promise<{ access_token: string }>
}