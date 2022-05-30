import { Module } from "@nestjs/common";
import { JwtAuthService } from "./service/jwt.service";
import { JwtModule } from "@nestjs/jwt";

@Module({
    imports: [
        JwtModule.register({
            secret: 'racxa',
            signOptions: { expiresIn: '1h' }
        }),
    ],
    providers: [JwtAuthService],
    exports: [JwtAuthService]
})
export class ServiceModule {
}