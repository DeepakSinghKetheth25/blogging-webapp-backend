import * as mongoose  from "mongoose";

export const auth = new mongoose.Schema({

    name :String,
    username: String,
    password: String,
    address:{
        street: String,
        city: String,
        state: String,
        country: String,
    },
    likedBlogs:[],
    dislikedBlogs: [],
    savedBlogs: [],
})