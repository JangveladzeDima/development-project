import {Module} from "@nestjs/common";
import {RolesGuard} from "./guard/role.guard";
import {JwtAuthGuard} from "./guard/jwt.guard";
import {JwtModule, JwtService} from "@nestjs/jwt";
import {JwtAuthService} from "./service/jwt.service";

@Module({
    imports: [
        JwtModule.register({
            secret: 'vaskania',
            signOptions: { expiresIn: '1h' }
        })
    ],
    providers: [RolesGuard, JwtAuthGuard, JwtAuthService]
})
export class AuthModule {
}