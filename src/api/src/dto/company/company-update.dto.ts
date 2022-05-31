import { IsNotEmpty, IsOptional } from "class-validator";

export class CompanyUpdateDto {
    @IsNotEmpty()
    @IsOptional()
    address?: string
    @IsNotEmpty()
    @IsOptional()
    identificationCode?: string
    @IsNotEmpty()
    @IsOptional()
    phoneNumber?: string
    @IsNotEmpty()
    @IsOptional()
    dataOfEstablishment?: Date
    @IsNotEmpty()
    @IsOptional()
    rating?: number
    @IsNotEmpty()
    @IsOptional()
    password?: string
}