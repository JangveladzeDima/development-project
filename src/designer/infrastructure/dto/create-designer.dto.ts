import {
  IsNotEmpty,
  IsString,
  IsEmail,
  MinLength,
  MaxLength,
  IsDate
} from "class-validator";

export class CreateDesignerDTO {
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
  @IsDate()
  readonly age: Date;

}
