import {Module} from "@nestjs/common";
import {RolesGuard} from "./guard/role.guard";
import {JwtAuthGuard} from "./guard/jwt.guard";
import {JwtModule} from "@nestjs/jwt";
import {JwtAuthService} from "./service/service/jwt.service";
import {JwtStrategy} from "./strategy/jwt.strategy";

@Module({
    imports: [
        JwtModule.register({
            secret: 'racxa',
            signOptions: { expiresIn: '1h' }
        })
    ],
    providers: [RolesGuard, JwtAuthGuard, JwtAuthService, JwtStrategy],
    exports:[JwtAuthService]
})
export class AuthModule {
}