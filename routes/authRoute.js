const { Router, application }=require('express');
const {auth,check}=require('../authmiddleware/authmiddleware');
const User = require('../models/User');
const Blog = require('../models/Blogs');

const routes =Router();
const jwt=require('jsonwebtoken');

const createToken = (id) =>{
    return jwt.sign({id},'sceret',{expiresIn:24*60*60})
}

routes.get("*",check);

routes.get("/", async (req, res) => {
    let blogs_array=[];
    Blog.find({},function(err, blog) {
        blogs_array=blog;
        // console.log(blogs_array[0].UserId);   
        res.render("HomePage",{blogs:blogs_array});
    })
});
  
//If Authenticated The GO;    

routes.get("/ArticleOneBlogs",auth,(req, res) => {
    let blogs_array=[];
    Blog.find({},function(err, blog) {
        blogs_array=blog;
        res.render("BlogRead",{blogs:blogs_array});
    })
});   
  
routes.get("/WriteBlog",auth,(req,res)=>{
    res.render("Write");
});

routes.post('/WriteBlog',auth,check,async(req,res)=>{
const {UserId,BlogTitle,BlogCategory,BlogData}=req.body;  
const new_blog=new Blog({
    UserId :UserId,
    BlogTitle:BlogTitle,
    BlogCategory:BlogCategory,
    BlogData:BlogData,
    Review:0,
    Likes:0    
  }); 
new_blog.save();
res.redirect('/');
// res.render("Post",{AuthorName:new_blog.UserId,Title:new_blog.BlogTitle,BlogData:new_blog.BlogData});
})
  

  
routes.get("/Post/:authorid/:title",auth,async (req,res)=>{

    const data = await Blog.find({UserId:req.params.authorid,BlogTitle:req.params.title});
    res.render("Post",{AuthorName:req.params.authorid,Title:req.params.title,BlogData:data[0].BlogData});
});

//Handling Error
const handleErrors= (err) =>{
let errors={userid:'',email:'',password:''}

if(err.code==11000)
{
    errors.userid='UserName Already Exists'
    return errors;
}

if(err.message.includes('user validation failed')){
    Object.values(err.errors).forEach(({properties})=>{
        errors[properties.path]=properties.message;
    });
}   
return errors;
}  

const SignInErrors= (err) =>{
    console.log(err);
    let errors={userid:'',password:''};
    if(err==="Incorrect Password")
    {
        errors["password"]=err;
    }
    if(err=="User Does Not Exist")
    {
        errors['userid']=err;
    }

    return errors;
} 

// ----
routes.get("/SignIn",(req,res)=>{
    res.render("SignIn");
});

routes.post("/SignIn",async (req,res)=>{

    const {userid, password}=req.body;   
    try{
        const user = await User.findOne({userid});
        if(user){
            const input_password = user.password;
            if(input_password===password){
                const token=createToken(user.userid)
                res.cookie('cookie',token,{httpOnly:true,maxAge:1000*60*60*24})
                return  res.status(200).json({user:userid});
            }
            throw Error('Incorrect Password');
        }
        throw Error('User Does Not Exist');
    }
    catch(e){
    const errors=SignInErrors(e.message);
    return res.status(404).json({errors});
    }

});
  
routes.get("/SignUp",(req,res)=>{
    // res.send(200);
    res.render("SignUp");
});
  
routes.post("/SignUp",async (req, res) => {

const {userid, email, password}=req.body;   

try{
const user = await User.create({userid,email,password});

res.status(201).json({user:user.userid})

}
catch(err){
const errors =handleErrors(err);
res.status(400).json({errors});
} 
}); 

routes.get('/LogOut', (req, res) => {
    res.cookie('cookie','',{maxAge:1})
    res.redirect('/');
});

module.exports =routes