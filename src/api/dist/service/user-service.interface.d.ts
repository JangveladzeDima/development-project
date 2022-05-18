import { CreateUserDto } from "../dto/user/create-user.dto";
import { IUser } from "../interface/user/user.interface";
import { IUserFilter } from "../interface/user/user-filter.interface";
export interface IUserService {
    create(createUserParams: CreateUserDto): Promise<IUser>;
    getUser(filter: IUserFilter): Promise<IUser>;
}
