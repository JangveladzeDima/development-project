import { Injectable } from "@nestjs/common";
import { IJwtAuthService } from "../port/jwt-auth-service.interface";
import { JwtPayloadDto } from "../../dto/jwt-payload.dto";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class JwtAuthService implements IJwtAuthService {
    constructor(
        private readonly jwtService: JwtService
    ) {
    }

    async getJwt(payload: JwtPayloadDto): Promise<string> {
        return this.jwtService.sign(payload)
    }
}