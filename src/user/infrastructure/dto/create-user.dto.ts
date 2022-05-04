import {IsNotEmpty} from "class-validator";

export class CreateUserDto {
    @IsNotEmpty()
    parentID: number
    @IsNotEmpty()
    role: string
}