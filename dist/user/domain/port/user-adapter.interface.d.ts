import { CreateUserDto } from "../../infrastructure/dto/create-user.dto";
export interface IUserAdapter {
    create(createUserParams: CreateUserDto): Promise<void>;
}
