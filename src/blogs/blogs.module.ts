import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { JwtStrategy } from "src/guards/jwt.strategy";
import { BlogsController } from "./blogs.controller";
import { BlogsService } from "./blogs.service";
import { blogs } from "./model/blogs.model";

@Module({
    imports: [MongooseModule.forFeature([{ name: 'blogs',schema : blogs}])],
    controllers: [BlogsController],
    providers: [BlogsService],
  })
  export class BlogsModule {}
  