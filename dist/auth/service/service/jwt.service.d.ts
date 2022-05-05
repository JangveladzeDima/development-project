import { JwtService } from "@nestjs/jwt";
import { IJwtService } from "../port/jwt-service.interface";
export declare class JwtAuthService implements IJwtService {
    private readonly jwtService;
    constructor(jwtService: JwtService);
    login(payload: any): Promise<{
        access_token: string;
    }>;
}
