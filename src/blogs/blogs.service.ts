import { HttpException, Injectable, Logger } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { platform } from "os";
import { BlogsDTO } from "./dto/blog.dto";
import { IBlogs } from "./interfaces/blogs.interface";

@Injectable()
export class BlogsService{
    

    constructor(@InjectModel('blogs') private readonly blogs: Model<IBlogs>){}

    public async getBlogs(){
        return await this.blogs.find().exec();
    }

    public async getBlogById(id){
        return await (await this.blogs.findById(id).exec());
    }

    public async createBlog(blog: BlogsDTO,){
        // blog.author = ;
        blog.date = new Date();
        blog.comments=null;
        const newBlog = await new this.blogs(blog);
        return newBlog.save();
    }

    public async updateBlog(id: string, updatedBlog: BlogsDTO) {
        const blog =   await this.blogs.findByIdAndUpdate(id).exec();
        if(!blog)
            return new HttpException('Not Found', 404);
        return blog;    
    }


    public async deleteBlogById(id){
        const blog  = await this.blogs.findByIdAndDelete(id).exec();
        if(!blog)
            return new HttpException('Not Found', 404);
        return blog;
    }

    public async incDecLike(blog_id :string, obj : {incorDecLikeBy: number } ){
        // await this.blogs.findById(blog_id).exec();
        const result = await this.blogs.updateOne({_id : blog_id}, {$inc: { "likes" : obj.incorDecLikeBy }}).exec(); 
        Logger.log("result");
        Logger.log(result);
        if(!result) 
            return new HttpException("Not Found", 404);
        return result;
    }

    public async incDecDislike(blog_id: string, obj : {incorDecDislikeBy: number }){
       
        const result = await this.blogs.updateOne({_id : blog_id}, {$inc: { "dislikes" : obj.incorDecDislikeBy }}).exec(); 
        Logger.log("result");
        Logger.log(result);
        if(!result) 
            return new HttpException("Not Found", 404);
        return result;

    }


    public async addComment(id: string, newComment: { username: string; date: Date; comment: string; }) {
        
        const result = this.blogs.updateOne(
            {_id: id},
            {
                $push: { 
                    comments: newComment
                }
            }
        )
        if(!result) 
            return new HttpException("Not Found", 404);
        return result;

    }









}