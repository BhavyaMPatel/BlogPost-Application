const mongoose = require('mongoose');

const BlogSchema=new mongoose.Schema({
    UserId:{
        type: String,
        require:true,
    },
    BlogTitle:{
        type:String,
        required:true,
    },
    BlogCategory:{
        type:String,
        required:true,
    },
    BlogData:{
        type:String,
        required:true,
    },
    Review:{
        type:Number,
    },
    Likes:{
        type:Number,
    }
});

const Blog=mongoose.model('Blogs',BlogSchema);

module.exports = Blog;