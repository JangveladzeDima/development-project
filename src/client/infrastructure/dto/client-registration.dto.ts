import { IsNotEmpty, IsString } from "class-validator";

export class ClientRegistrationDto {
    @IsNotEmpty()
    @IsString()
    firstname: string
    @IsNotEmpty()
    @IsString()
    lastname: string
    @IsNotEmpty()
    @IsString()
    email: string
    @IsNotEmpty()
    @IsString()
    password: string
}