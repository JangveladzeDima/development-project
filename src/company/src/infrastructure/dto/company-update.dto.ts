import {IsEmail, IsISO8601, IsNotEmpty, IsOptional, IsString, MaxLength, MinLength} from "class-validator";

export class CompanyUpdateDto {
    @IsNotEmpty()
    @IsString()
    @MaxLength(20)
    @MinLength(2)
    @IsOptional()
    name?: string
    @IsNotEmpty()
    @IsString()
    @MaxLength(20)
    @MinLength(4)
    @IsOptional()
    address?: string
    @IsNotEmpty()
    @IsString()
    @MaxLength(50)
    @IsOptional()
    @MinLength(3)
    identificationCode?: string
    @IsNotEmpty()
    @IsString()
    @MaxLength(15)
    @MinLength(5)
    @IsOptional()
    phoneNumber?: string
    @IsNotEmpty()
    @IsISO8601()
    @IsOptional()
    dataOfEstablishment?: Date
    @IsNotEmpty()
    @IsString()
    @IsEmail()
    @IsOptional()
    email?: string
    @IsNotEmpty()
    @IsString()
    @MaxLength(40)
    @IsOptional()
    @MinLength(5)
    password?: string
}