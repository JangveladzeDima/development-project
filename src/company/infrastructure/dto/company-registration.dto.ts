import {IsEmail, IsISO8601, IsNotEmpty, IsString, MaxLength, MinLength} from "class-validator";

export class CompanyRegistrationDto {
    @IsNotEmpty()
    @IsString()
    @MaxLength(20)
    @MinLength(2)
    name: string
    @IsNotEmpty()
    @IsString()
    @MaxLength(20)
    @MinLength(4)
    address: string
    @IsNotEmpty()
    @IsString()
    @MaxLength(50)
    @MinLength(3)
    identificationCode: string
    @IsNotEmpty()
    @IsString()
    @MaxLength(15)
    @MinLength(5)
    phoneNumber: string
    @IsNotEmpty()
    @IsISO8601()
    dataOfEstablishment: Date
    @IsNotEmpty()
    @IsString()
    @IsEmail()
    email: string
    @IsNotEmpty()
    @IsString()
    @MaxLength(40)
    @MinLength(5)
    password: string
}