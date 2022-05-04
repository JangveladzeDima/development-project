import {Injectable} from "@nestjs/common";
import {JwtService} from "@nestjs/jwt";
import {IJwtService} from "../port/jwt-service.interface";

@Injectable()
export class JwtAuthService implements IJwtService {
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