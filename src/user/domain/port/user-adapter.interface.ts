import {CreateUserDto} from "../../infrastructure/dto/create-user.dto";
import {IUser} from "../../infrastructure/entity/user.interface";
import {LoginUserDto} from "../../infrastructure/dto/login-user.dto";
import {IUserFilter} from "../../infrastructure/interface/user-filter.interface";

export interface IUserAdapter {
    create(createUserParams: CreateUserDto): Promise<IUser>

    getUser(filter: IUserFilter): Promise<IUser>

    userLogin(loginParams: LoginUserDto): Promise<{ access_token: string }>
}