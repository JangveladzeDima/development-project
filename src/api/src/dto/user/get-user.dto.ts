import {IsNumber, IsOptional, IsString} from "class-validator";

export class GetUserDto {
    ID?: number
    @IsOptional()
    @IsNumber()
    parentID?: number
    @IsOptional()
    @IsString()
    role?: string
    @IsOptional()
    @IsString()
    email?: string
}