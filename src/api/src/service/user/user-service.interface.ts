import { CreateUserDto } from "../../dto/user/create-user.dto";
import { IUser } from "../../interface/user/user.interface";
import { IUserFilter } from "../../interface/user/user-filter.interface";
import { LoginUserDto } from "../../dto/user/login-user.dto";

export interface IUserService {
    create(createUserParams: CreateUserDto): Promise<IUser>

    getUser(filter: IUserFilter): Promise<IUser>

    loginUser(loginParams: LoginUserDto): Promise<string>
}