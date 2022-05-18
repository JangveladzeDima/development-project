import { IUser } from "../../infrastructure/entity/user.interface";
import { IUserFilter } from "../../infrastructure/interface/user-filter.interface";
export interface IUserAdapter {
    create(createUserParams: any): Promise<IUser>;
    getUser(filter: IUserFilter): Promise<IUser>;
}
