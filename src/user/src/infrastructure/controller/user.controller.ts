import { Controller, Inject } from "@nestjs/common";
import { Ctx, Payload, RmqContext } from "@nestjs/microservices";
import { MessagePattern, EventPattern } from "@nestjs/microservices";
import { UserAdapter } from "../../domain/adapter/user.adapter";
import { IUserAdapter } from "../../domain/port/user-adapter.interface";

@Controller('user')
export class UserController {
    constructor(
        @Inject(UserAdapter) private readonly userAdapter: IUserAdapter
    ) {
    }

    @MessagePattern('create-user')
    async create(@Payload() user, @Ctx() context: RmqContext) {
        try {
            console.log(user);
            const newUser = await this.userAdapter.create(user)
            return newUser
        } catch (err) {
            console.log(err)
        }
    }

}