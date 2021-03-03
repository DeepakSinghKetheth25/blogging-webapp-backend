import { Mongoose } from "mongoose";
import {Document} from 'mongoose';

export interface IUsers extends Document {
    
    name :string;
    username: string;
    password: string;
    address:{
        street: string;
        city: string;
        state: string;
        country: string;
    } ;
    likedBlogs: string[];
    dislikedBlogs: string[];
    savedBlogs: string[];

}