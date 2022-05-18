import { IUser } from "./user.interface";

export interface IUserCreateResponse {
    user: IUser,
    message: string
}