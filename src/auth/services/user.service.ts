import { HttpException, HttpStatus, Injectable, Logger } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { SignupResponse } from "../dto/signupResponse.dto";
import { UserCredentials } from "../dto/user.dto";
import { IUsers } from "../interface/user.interface";
import {JwtService } from '@nestjs/jwt'
import * as bcrypt from 'bcrypt';
import { LoginResponse } from "../dto/loginResponse.dto";
import { UserDetails } from "../model/user-details.model";

const rounds=12;

// interface UserDetails  {
//     _id : String;
//     username: String;
//     likedBlogs: [];
//     dislikedBlogs: [];
//     savedBlogs: [];
// }

@Injectable()
export class UserService{

    constructor(@InjectModel('auth') private readonly users: Model<IUsers>,private readonly jwtService: JwtService){}

    userdetails : UserDetails;

    public async userHello():Promise<string>{
        return "Hello User";
    }
    
    public async signup(user): Promise<SignupResponse>{

        const existinguser = await this.users.findOne({'username':user.username}).exec();
        if(existinguser){
            Logger.log("User Exists with this username");
            throw new HttpException("Username Already Exists",HttpStatus.BAD_REQUEST); 
        }

        user.password = await bcrypt.hash(user.password,rounds) ;
       
        const newuser = await new this.users(user);
        return newuser.save();
    }


    public async login(user): Promise<LoginResponse>{

        const existinguser =  await this.users.findOne({'username' : user.username}).exec();
        
        if(!existinguser)
        throw new HttpException('User not Found',HttpStatus.NOT_FOUND);

        if(await bcrypt.compare(user.password,existinguser.password)){

            let returnedUser = new UserCredentials();
            returnedUser.username = user.username;
            returnedUser.password = existinguser.password;
            return {
                username: user.username,
                token: await this.jwtService.signAsync({returnedUser}),
                tokenExpiry: '600000' ,
            };
        }
        throw new HttpException('Login Unsuccessful',HttpStatus.UNAUTHORIZED);
    }


    public async getCurrentUserDetails(obj: {currentUsername: string}): Promise<any>{

        const result = await this.users.findOne({username: obj.currentUsername}).exec();
        if(!result)
            throw new HttpException("User not Found",404);
        return result;
    }


    public async updateUserLikedBlogs(blog_id: string, obj: {currentUsername :string, incorDecLikeBy:number}){
        if(obj.incorDecLikeBy==1){
            Logger.log("Inc Like");
            Logger.log(obj);
        const result=await this.users.updateOne(
            { username: obj.currentUsername },
            {
                $push: {
                    likedBlogs: blog_id
                }
            }
        ).exec();
        
        if(!result)
            throw new HttpException("Error Occurred while updating Liked Posts",HttpStatus.NOT_IMPLEMENTED);
        return result;
        }
        else if(obj.incorDecLikeBy==-1){
            Logger.log("Dec Like");
            Logger.log(obj);

            const result=await this.users.updateOne(
                { username: obj.currentUsername },
                {
                    $pull: {
                        likedBlogs: blog_id
                    }
                }
            ).exec();

            if(!result)
                throw new HttpException("Error Occurred while updating Liked Posts",HttpStatus.NOT_IMPLEMENTED);
            return result;
        }
        

    }

    public async updateUserDislikedBlogs(blog_id: string, obj: {currentUsername :string, incDecDislikeBy: number}){
        if(obj.incDecDislikeBy==1){
            const result= await this.users.updateOne(
                { username: obj.currentUsername },
                {
                    $push: {
                        dislikedBlogs: blog_id
                    }
                }
            ).exec();
            
            if(!result)
                throw new HttpException("Error Occurred while updating Liked Posts",HttpStatus.NOT_IMPLEMENTED);
            return result;
            }
            else if(obj.incDecDislikeBy==-1){
                const result=await this.users.updateOne(
                    { username: obj.currentUsername },
                    {
                        $pull: {
                            dislikedBlogs: blog_id
                        }
                    }
                ).exec();
    
                if(!result)
                    throw new HttpException("Error Occurred while updating Liked Posts",HttpStatus.NOT_IMPLEMENTED);
                return result;
            }
    }

    public async saveBlog(blog_id, obj: {currentUsername :string}){

    const response = await this.users.findOne(
        {username: obj.currentUsername}
    ).exec();
        // {   
        //     savedBlogs:[blog_id]
        // }
        // ).exec();

        Logger.log("Printing Obj")
        Logger.log(response);

    if(response.savedBlogs.includes(blog_id)){
        Logger.log("Exists");
        const result=await this.users.updateOne(
            { username: obj.currentUsername },
            {
                $pull: {
                    savedBlogs: blog_id
                }
            }
        ).exec();
        
        if(!result)
            throw new HttpException("Error Occurred while updating Liked Posts",HttpStatus.NOT_IMPLEMENTED);
        return result;
        }
    else {
        Logger.log("Doesn't exist")
        const result=await this.users.updateOne(
            { username: obj.currentUsername },
            {
                $push: {
                    savedBlogs: blog_id
                }
            }
        ).exec();
        
        if(!result)
            throw new HttpException("Error Occurred while updating Liked Posts",HttpStatus.NOT_IMPLEMENTED);
        return result;
        }
    }

    public async updatedUserDetails(updatedUser: UserCredentials) {
        
        Logger.log(updatedUser);
        const id= {username: updatedUser.username};
        const objtoUpdate = {name: updatedUser.name,address: updatedUser.address};

        const result1 = await this.users.findOne(id);
        Logger.log(result1);

        const result = await this.users.updateOne(
            {username:updatedUser.username},
            {
                $set:{name: updatedUser.name, address: updatedUser.address}
                
            });
        Logger.log(result);

        if(!result)
            return  new HttpException("Error Occurred while updating User Details",HttpStatus.NOT_IMPLEMENTED);
        return result;

     }


}