import { IUser } from "../../infrastructure/entity/user.interface";
export interface IUserAdapter {
    create(createUserParams: any): Promise<IUser>;
}
