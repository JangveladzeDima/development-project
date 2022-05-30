import { IsNotEmpty, IsString } from "class-validator";

export class JwtPayloadDto {
    @IsNotEmpty()
    @IsString()
    email: string
    @IsNotEmpty()
    @IsString()
    role: string

}

