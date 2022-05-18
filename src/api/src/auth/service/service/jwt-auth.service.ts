import {Injectable} from "@nestjs/common";
import {JwtService} from "@nestjs/jwt";
import {IJwtAuthService} from "../port/jwt--auth-service.interface";

@Injectable()
export class JwtAuthService implements IJwtAuthService {
    constructor(
        private readonly jwtService: JwtService
    ) {
    }

    async login(payload) {
        return {
            access_token: this.jwtService.sign(payload),
        }
    }
}