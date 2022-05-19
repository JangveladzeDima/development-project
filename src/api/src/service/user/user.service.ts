import { HttpException, Inject, Injectable } from "@nestjs/common";
import { CreateUserDto } from "../../dto/user/create-user.dto";
import { ClientProxy } from "@nestjs/microservices";
import { firstValueFrom } from "rxjs";
import { IUser } from "../../interface/user/user.interface";
import { IUserService } from "./user-service.interface";
import { IUserFilter } from "../../interface/user/user-filter.interface";

@Injectable()
export class UserService implements IUserService {
    constructor(
        @Inject('USER_SERVICE') private readonly userService: ClientProxy
    ) {
    }

    async create(createUserParams: CreateUserDto): Promise<IUser> {
        const user = await firstValueFrom(this.userService.send('user-create', createUserParams))
        return user
    }

    async getUser(filter: IUserFilter): Promise<IUser> {
        const user = await firstValueFrom(this.userService.send('get-user', filter))
        if (user.hasOwnProperty('response')) {
            throw new HttpException(user['response']['message'], user['response']['statusCode'])
        }
        return user
    }
}