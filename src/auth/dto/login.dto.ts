import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class LoginCredentials{
    @IsEmail()
    username : string;

    @IsNotEmpty()
    password : string;
}