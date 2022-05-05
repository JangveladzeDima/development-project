import {CreateUserDto} from "../../infrastructure/dto/create-user.dto";
import {IUser} from "../../infrastructure/entity/user.interface";

export interface IUserAdapter {
    create(createUserParams: CreateUserDto): Promise<IUser>
}