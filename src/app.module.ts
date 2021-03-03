import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BlogsModule } from './blogs/blogs.module';
import { AuthModule } from './auth/auth.module';
import { JwtService } from '@nestjs/jwt';



@Module({
  imports: [
    BlogsModule,
    AuthModule,
    MongooseModule.forRoot('mongodb+srv://root:root@cluster0.tthe7.mongodb.net/bloggingapp'),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
