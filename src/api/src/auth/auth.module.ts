import {Module} from "@nestjs/common";
import {RolesGuard} from "./guard/role.guard";
import {JwtAuthGuard} from "./guard/jwt.guard";
import {JwtModule} from "@nestjs/jwt";
import {JwtAuthService} from "./service/service/jwt-auth.service";
import {JwtStrategy} from "./strategy/jwt.strategy";
import {CryptoHashService} from "./service/service/crypto-hash.service";
import {UserDatabaseModule} from "../user/src/infrastructure/database/user-database.module";

@Module({
    imports: [
        JwtModule.register({
            secret: 'racxa',
            signOptions: { expiresIn: '1h' }
        }),
        UserDatabaseModule,
    ],
    providers: [RolesGuard, JwtAuthGuard, JwtAuthService, JwtStrategy, CryptoHashService],
    exports: [JwtAuthService, CryptoHashService]
})
export class AuthModule {
}