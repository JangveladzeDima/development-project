import { CreateUserDto } from "../../infrastructure/dto/create-user.dto";
import { IUser } from "../../infrastructure/entity/user.interface";
import { LoginDto } from "../../infrastructure/dto/login.dto";
export interface IUserAdapter {
    create(createUserParams: CreateUserDto): Promise<IUser>;
    getUser(filter: {}): Promise<IUser>;
    loginUser(loginParams: LoginDto): Promise<{
        access_token: string;
    }>;
}
