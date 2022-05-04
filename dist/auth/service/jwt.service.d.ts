import { JwtService } from "@nestjs/jwt";
export declare class JwtAuthService {
    private readonly jwtService;
    constructor(jwtService: JwtService);
    login(id: number, role: string): Promise<{
        access_token: string;
    }>;
}
