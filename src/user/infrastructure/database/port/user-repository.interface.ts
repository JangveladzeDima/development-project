import {IUser} from "../../entity/user.interface";

export interface IUserRepository {
    create(userParams: IUser): Promise<IUser>

    getUser(params: { filter: {} }): Promise<IUser>

    updateUser(params: { filter: {}, updateParams: {} }): Promise<void>
}