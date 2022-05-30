import { Controller, Inject, Logger } from "@nestjs/common";
import { MessagePattern, Payload } from "@nestjs/microservices";
import { JwtPayloadDto } from "../dto/jwt-payload.dto";
import { JwtAuthService } from "../service/service/jwt.service";
import { IJwtAuthService } from "../service/port/jwt-auth-service.interface";

@Controller('')
export class JwtController {
    logger = new Logger(JwtController.name)

    constructor(
        @Inject(JwtAuthService) private readonly jwtAuthService: IJwtAuthService
    ) {
    }

    @MessagePattern('get-jwt')
    async getJwt(@Payload() payload: JwtPayloadDto) {
        try {
            return this.jwtAuthService.getJwt(payload)
        } catch (err) {
            this.logger.error(err.message)
        }
    }
}