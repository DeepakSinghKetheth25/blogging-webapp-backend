import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class UserCredentials {

    @IsEmail()
    username: string;

    @IsNotEmpty()
    password: string;

    name: string;

    address:{
        street: string;
        city: string;
        state: string;
        country: string;
    } ;

    likedBlogs:String[];
    dislikedBlogs: String[];
    savedBlogs: String[];



}