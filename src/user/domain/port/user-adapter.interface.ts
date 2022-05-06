import {CreateUserDto} from "../../infrastructure/dto/create-user.dto";
import {IUser} from "../../infrastructure/entity/user.interface";
import {LoginUserDto} from "../../infrastructure/dto/login-user.dto";

export interface IUserAdapter {
    create(createUserParams: CreateUserDto): Promise<IUser>

    getUser(filter: {}): Promise<IUser>

    userLogin(loginParams: LoginUserDto): Promise<{ access_token:string }>
}