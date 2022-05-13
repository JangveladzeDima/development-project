import {IsEmail, IsNumber, IsString, Max} from "class-validator";

export class AddVoteDto {
    @IsNumber()
    score: number
    @IsString()
    @IsEmail()
    voteTo: string
}