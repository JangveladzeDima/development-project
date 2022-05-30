import { JwtPayloadDto } from "../../dto/jwt-payload.dto";

export interface IJwtAuthService {
    getJwt(payload: JwtPayloadDto): Promise<string>
}