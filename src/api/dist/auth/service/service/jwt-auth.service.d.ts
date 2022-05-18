import { JwtService } from "@nestjs/jwt";
import { IJwtAuthService } from "../port/jwt--auth-service.interface";
export declare class JwtAuthService implements IJwtAuthService {
    private readonly jwtService;
    constructor(jwtService: JwtService);
    login(payload: any): Promise<{
        access_token: string;
    }>;
}
