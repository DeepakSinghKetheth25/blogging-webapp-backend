import { Body, Controller, Get, Post, Request, UseGuards, Logger, Headers, Put, Param, Delete } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { request } from "express";
import { JwtAuthGuard } from "src/guards/auth.guard";
import { BlogsModule } from "./blogs.module";
import { BlogsService } from "./blogs.service";
import { BlogsDTO } from "./dto/blog.dto";

@Controller('blogs')
export class BlogsController{

    constructor(private blogService : BlogsService) {}


    @Get()
    public async getBlogs(){
        return this.blogService.getBlogs();
    }

    @UseGuards(JwtAuthGuard)
    @Post()
    public async createBlog(@Body() blog: BlogsDTO){
        Logger.log("Creating Blog")
    return  this.blogService.createBlog(blog);
    }


    @UseGuards(JwtAuthGuard)
    @Put(':id')
    public async updateBlog(@Param('id') id : string, @Body() updatedBlog:BlogsDTO){
        return this.blogService.updateBlog(id,updatedBlog);
    }


    @Get(':id')
    public async getBlogById(@Param('id') id: string){
        return this.blogService.getBlogById(id);
    }


    @UseGuards(JwtAuthGuard)
    @Delete(':id')
    public async deleteBlogById(@Param('id') id: string){
        return this.blogService.deleteBlogById(id);
    }

    @UseGuards(JwtAuthGuard)
    @Put('like/:id')
    public async incDecBlogLikes(@Param('id') id: string, @Body() obj: {incorDecLikeBy: number} ){
        return this.blogService.incDecLike(id, obj  );
    }

    @UseGuards(JwtAuthGuard)
    @Put('dislike/:id')
    public async incDecBlogDislikes(@Param('id') id: string, @Body() obj: {incorDecDislikeBy: number}){
        return this.blogService.incDecDislike(id, obj);
    }

    @UseGuards(JwtAuthGuard)
    @Put('comment/:id')
    public async addComment(@Param('id') id: string, @Body() newComment: {username: string, date: Date, comment: string}){
        return this.blogService.addComment(id, newComment);
    }




    // @UseGuards(JwtAuthGuard)
    // @Get('user')
    // getUser(@Request() req){
    //     return request.user;
    // }

}