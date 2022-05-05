import {Body, Controller, Get, Inject, Logger, Post} from "@nestjs/common";
import {CreateUserDto} from "../dto/create-user.dto";
import {UserAdapter} from "../../domain/adapter/user.adapter";
import {IUserAdapter} from "../../domain/port/user-adapter.interface";
import {Roles} from "../../../auth/decorator/role.decorator";
import {RolesGuard} from "../../../auth/guard/role.guard";
import {UseGuards} from "@nestjs/common";
import {JwtAuthGuard} from "../../../auth/guard/jwt.guard";
import {JwtAuthService} from "../../../auth/service/service/jwt.service";

@Controller('/user')
export class UserController {
    logger = new Logger(UserController.name)

    constructor(
        @Inject(UserAdapter) private readonly userAdapter: IUserAdapter,
        private readonly jwtService: JwtAuthService
    ) {
    }

    @Post('/create')
    @Roles('admin', 'user')
    @UseGuards(JwtAuthGuard, RolesGuard)
    async create(@Body() createUserParams: CreateUserDto) {
        try {
            const user = await this.userAdapter.create(createUserParams)
            return {
                user,
                message: 'ok!'
            }
        } catch (err) {
            this.logger.error(err.message)
            throw err
        }
    }

    @Get('/')
    async getUser(@Body('filter') filter: {}) {
        try {
            const user = await this.userAdapter.getUser(filter)
            return {
                user,
                message: 'ok!'
            }
        } catch (err) {
            this.logger.error(err.message)
            throw err
        }
    }
}