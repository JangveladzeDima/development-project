import {Body, Controller, Inject, Logger, Post} from "@nestjs/common";
import {CreateUserDto} from "../dto/create-user.dto";
import {UserAdapter} from "../../domain/adapter/user.adapter";
import {IUserAdapter} from "../../domain/port/user-adapter.interface";
import {Roles} from "../../application/decorators/role.decorator";
import {RolesGuard} from "../../application/guards/role.guard";
import {UseGuards} from "@nestjs/common";

@Controller('/user')
export class UserController {
    logger = new Logger(UserController.name)

    constructor(
        @Inject(UserAdapter) private readonly userAdapter: IUserAdapter
    ) {
    }

    @Post('/create')
    @Roles('admin', 'user')
    @UseGuards(RolesGuard)
    async create(@Body() createUserParams: CreateUserDto) {
        try {
            await this.userAdapter.create(createUserParams)
            return {
                message: 'ok!'
            }
        } catch (err) {
            this.logger.error(err.message)
            throw err
        }
    }
}