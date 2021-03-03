import * as mongoose from "mongoose";

export const blogs = new mongoose.Schema({

    title : String,
    description : String,
    author : String,
    date : Date,
    category : String,
    externalLink : String,
    likes: Number,
    dislikes: Number,  
    comments:[
        {
        username : String,
        date :Date,
        comment: String,
        }
    ]
}) 