import {Body, Controller, Get, Inject, Logger, Post, HttpCode, Query} from "@nestjs/common";
import {CreateUserDto} from "../dto/create-user.dto";
import {UserAdapter} from "../../domain/adapter/user.adapter";
import {IUserAdapter} from "../../domain/port/user-adapter.interface";
import {Roles} from "../../../auth/decorator/role.decorator";
import {RolesGuard} from "../../../auth/guard/role.guard";
import {UseGuards} from "@nestjs/common";
import {JwtAuthGuard} from "../../../auth/guard/jwt.guard";
import {LoginUserDto} from "../dto/login-user.dto";

@Controller('/user')
export class UserController {
    logger = new Logger(UserController.name)

    constructor(
        @Inject(UserAdapter) private readonly userAdapter: IUserAdapter
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
    async getUser(
        @Query('ID') ID?:number,
        @Query('email') email?:string,
        @Query('parentID') parentID?:number,
        @Query('role') role?:string
    ) {
        try {
            const user = await this.userAdapter.getUser({
                ID,
                email,
                parentID,
                role
            })
            return {
                user,
                message: 'ok!'
            }
        } catch (err) {
            this.logger.error(err.message)
            throw err
        }
    }

    @Post('/login')
    @HttpCode(200)
    async userLogin(@Body() loginParams: LoginUserDto) {
        try {
            const { access_token } = await this.userAdapter.userLogin(loginParams)
            return {
                access_token,
                message: 'ok'
            }
        } catch (err) {
            this.logger.error(err.message)
            throw err
        }
    }
}