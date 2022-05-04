import {Injectable} from "@nestjs/common";
import {JwtService} from "@nestjs/jwt";

@Injectable()
export class JwtAuthService {
    constructor(
        private readonly jwtService: JwtService
    ) {
    }

    async login(id: number, role: string) {
        return {
            access_token: this.jwtService.sign({
                id, role
            }),
        }
    }
}