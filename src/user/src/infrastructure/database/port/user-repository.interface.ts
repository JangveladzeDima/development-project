import {IUser} from "../../entity/user.interface";
import {IUserFilter} from "../../interface/user-filter.interface";

export interface IUserRepository {
    create(userParams: IUser): Promise<IUser>

    getUser(params: { filter: IUserFilter }): Promise<IUser>

    updateUser(params: { filter: {}, updateParams: {} }): Promise<void>
}