import { BadRequestException, HttpException, HttpStatus, Inject, Injectable } from "@nestjs/common";
import { CreateUserDto } from "../../dto/user/create-user.dto";
import { ClientProxy } from "@nestjs/microservices";
import { firstValueFrom } from "rxjs";
import { IUser } from "../../interface/user/user.interface";
import { IUserService } from "./user-service.interface";
import { IUserFilter } from "../../interface/user/user-filter.interface";
import { LoginUserDto } from "../../dto/user/login-user.dto";
import { IDesigner } from "../../interface/designer/designer.interface";
import { ICompany } from "../../interface/company/company.model";

@Injectable()
export class UserService implements IUserService {
    constructor(
        @Inject('USER_SERVICE') private readonly userService: ClientProxy,
        @Inject('JWT_SERVICE') private readonly jwtService: ClientProxy,
        @Inject('COMPANY_SERVICE') private readonly companyService: ClientProxy,
        @Inject('DESIGNER_SERVICE') private readonly designerService: ClientProxy,
        @Inject('HASH_SERVICE') private readonly hashService: ClientProxy
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

    async loginUser(loginParams: LoginUserDto): Promise<string> {
        const user: IUser = await firstValueFrom(this.userService.send('get-user', { email: loginParams.email }))
        if (user === null) {
            throw new HttpException('password or email not correct', HttpStatus.NOT_FOUND)
        }
        const { parentID, role } = user
        const userByRole = await this.getUserByRole(parentID, role)
        const hashedPassword = await firstValueFrom(this.hashService.send('get-hash-by-salt', {
            text: loginParams.password,
            salt: userByRole.salt
        }))
        if (hashedPassword !== userByRole.password) {
            throw new HttpException('password or email not correct', HttpStatus.NOT_FOUND)
        }
        const token = await firstValueFrom(this.jwtService.send('get-jwt', {
            email: userByRole.email,
            role
        }))
        return token
    }

    private async getUserByRole(userID: number, role: string): Promise<ICompany | IDesigner> {
        if (role == 'company') {
            return firstValueFrom(this.companyService.send('company-get', { ID: userID }))
        }
        if (role == 'designer') {
            return firstValueFrom(this.designerService.send('get', { ID: userID }))
        }
    }
}