import { Body, Controller, Get, HttpCode, Inject, Logger, Post, Query, } from "@nestjs/common";
import { CreateUserDto } from "../dto/user/create-user.dto";
import { Roles } from "../auth/decorator/role.decorator";
import { LoginUserDto } from "../dto/user/login-user.dto";
import { UserService } from "../service/user.service";
import { IUserCreateResponse } from "../interface/user/user-create-response.interface";
import { IUserService } from "../service/user-service.interface";
import { IUserFilter } from "../interface/user/user-filter.interface";

@Controller('/user')
export class UserController {
    logger = new Logger(UserController.name)

    constructor(
        @Inject(UserService) private readonly userService: IUserService
    ) {
    }

    @Post('/create')
    @Roles('admin', 'user')
    async create(@Body() createUserParams: CreateUserDto): Promise<IUserCreateResponse> {
        try {
            const user = await this.userService.create(createUserParams)
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
    async getUser(
        @Query('ID') ID?: number,
        @Query('email') email?: string,
        @Query('parentID') parentID?: number,
        @Query('role') role?: string
    ): Promise<IUserCreateResponse> {
        try {
            const filter: IUserFilter = {
                ID,
                email,
                parentID,
                role
            }
            const user = await this.userService.getUser(filter)
            return {
                user,
                message: 'ok'
            }
        } catch (err) {
            this.logger.error(err)
            throw err
        }
    }

    @Post('/login')
    @HttpCode(200)
    async userLogin(@Body() loginParams: LoginUserDto) {
        try {
        } catch (err) {
            this.logger.error(err.message)
            throw err
        }
    }
}