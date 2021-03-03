import { Body, Controller, Logger, Param, Post, Put, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "src/guards/auth.guard";
import { LoginCredentials } from "../dto/login.dto";
import { UserCredentials } from "../dto/user.dto";
import { UserService } from "../services/user.service";

@Controller('auth')
export class UserController{

    constructor(private userService : UserService){}

    @Post('signup')
    public async signup(@Body() newuser: UserCredentials){
       return  await this.userService.signup(newuser);
    }

    @Post('login')
    public async login(@Body() loginuser: LoginCredentials){
       return  await this.userService.login(loginuser);
    }

    @Post('userdetails')
    public async getCurrentUserDetails(@Body() obj: {currentUsername : string}){
        return await this.userService.getCurrentUserDetails(obj);
    }

    @UseGuards(JwtAuthGuard)
    @Put('updatelikedblogs/:id')
    public async updateUserLikedBlogs(@Param('id') id: string, @Body() obj: {currentUsername : string, incorDecLikeBy: number}){
       Logger.log("Reached");
       Logger.log(obj);
        return await this.userService.updateUserLikedBlogs(id, obj);
    }

    @UseGuards(JwtAuthGuard)
    @Put('updatedislikedblogs/:id')
    public async updateUserDislikedBlogs(@Param('id') id: string, @Body() obj: {currentUsername : string, incDecDislikeBy: number}){
        return await this.userService.updateUserDislikedBlogs(id, obj);
    }

    @UseGuards(JwtAuthGuard)
    @Put('save/:id')
    public async savePost(@Param('id') id: string, @Body() obj:{currentUsername : string}){
        return await this.userService.saveBlog(id, obj);
    }

    @UseGuards(JwtAuthGuard)
    @Put('update/userDetails')
    public async updateUserDetails(@Body() updatedUser: UserCredentials){
       Logger.log("Req to DB");
        return await this.userService.updatedUserDetails(updatedUser);
    }




}