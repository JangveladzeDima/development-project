import {
    IsNotEmpty,
    IsString,
    IsEmail,
    MinLength,
    MaxLength,
    IsISO8601
} from "class-validator";

export class UpdateDesignerDTO {
    @IsNotEmpty()
    @IsString()
    @IsEmail()
    readonly email: string;

    @IsNotEmpty()
    @IsString()
    @MinLength(6)
    @MaxLength(50)
    readonly password: string;

    @IsNotEmpty()
    @IsString()
    @MinLength(3)
    @MaxLength(20)
    readonly firstname: string;


    @IsNotEmpty()
    @IsString()
    @MinLength(3)
    @MaxLength(30)
    readonly lastname: string;

    @IsNotEmpty()
    @IsISO8601()
    readonly birthday: Date;

}
