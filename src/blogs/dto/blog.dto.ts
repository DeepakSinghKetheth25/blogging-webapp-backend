export class BlogsDTO{

    title : string;
    description : string;
    author : string;
    date : Date;
    category : string;
    externalLink : string  
    likes: Number;
    dislikes: Number; 
    comments:[
        {
        username : string;
        date :Date;
        comment: string;
        }
    ]

}