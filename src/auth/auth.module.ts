import { Module } from "@nestjs/common";
import { JwtModule, JwtService } from "@nestjs/jwt";
import { MongooseModule } from "@nestjs/mongoose";
import { PassportModule } from "@nestjs/passport";
import { JwtAuthGuard } from "src/guards/auth.guard";
import { jwtConstants } from "src/guards/constants";
import { JwtStrategy } from "src/guards/jwt.strategy";
import { UserController } from "./controllers/user.controller";
import { auth } from "./model/user.model";
import { UserService } from "./services/user.service";

@Module({
    
    imports:[
      PassportModule.register({ defaultStrategy: 'jwt' }),
      // ConfigModule,
      JwtModule.registerAsync({
      // imports: [
      //     ConfigModule,
      // ],

      useFactory: async( ) =>{
          return {
          // secret: configservice.get('JWT_SECRET'),
          secret: jwtConstants.secret,
          signOptions: {expiresIn: '600000'},
          }
      },
      // inject:[ConfigService],
  }),
  MongooseModule.forFeature([{ name: 'auth',schema : auth}])
  
  ],

  controllers: [UserController],
  providers: [UserService,JwtStrategy,JwtAuthGuard],
  exports: [UserService]
  
  })
  export class AuthModule {}
  