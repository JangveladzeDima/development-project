import { Controller, Inject } from "@nestjs/common";
import { Ctx, Payload, RmqContext } from "@nestjs/microservices";
import { MessagePattern, EventPattern } from "@nestjs/microservices";
import { UserAdapter } from "../../domain/adapter/user.adapter";
import { IUserAdapter } from "../../domain/port/user-adapter.interface";
import { IUser } from "../entity/user.interface";
import { IUserFilter } from "../interface/user-filter.interface";

@Controller('user')
export class UserController {
    constructor(
        @Inject(UserAdapter) private readonly userAdapter: IUserAdapter
    ) {
    }

    @MessagePattern('create-user')
    async create(@Payload() user): Promise<IUser> {
        try {
            const newUser = await this.userAdapter.create(user)
            return newUser
        } catch (err) {
            console.log(err)
        }
    }

    @MessagePattern('get-user')
    async getUser(@Payload() filter: IUserFilter): Promise<IUser> {
        try {
            const user = await this.userAdapter.getUser(filter)
            return user
        } catch (err) {
            return err
        }
    }

}