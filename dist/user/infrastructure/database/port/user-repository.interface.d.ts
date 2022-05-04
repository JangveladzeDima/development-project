import { IUser } from "../../entity/user.interface";
export interface IUserRepository {
    create(userParams: IUser): Promise<void>;
    getUser(params: {
        filter: {};
    }): Promise<Partial<IUser>>;
}
