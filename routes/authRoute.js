const { Router }=require('express');
const User = require('../models/User');
const routes =Router();
const jwt=require('jsonwebtoken');
//Handling Error
const handleErrors= (err) =>{
console.log(err.message,err.code);

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

// ----

const createToken = (id) =>{
    return jwt.sign({id},'sceret',{expiresIn:24*60*60})
}

routes.get("/SignIn",(req,res)=>{
    res.render("SignIn");
});

routes.post("/SignIn",(req,res)=>{
    res.redirect("/ArticleOneBlogs");
});
  
routes.get("/SignUp",(req,res)=>{
    // res.send(200);
    res.render("SignUp");
});
  
routes.post("/SignUp", async (req, res) => {
    // const userid=req.body.userid;
    // const email=req.body.email;
    // const password=req.body.password;
    const {userid, email, password}=req.body;   
    console.log(userid, email, password);

    try{
    const user = await User.create({userid,email,password});
    const token=createToken(user.userid)
    res.cookie('cookie',token,{httpOnly:true,maxAge:1000*60*60*24})
    res.status(201).json({user:user.userid})

    }
    catch(err){
        const errors =handleErrors(err);
        res.status(400).json({errors});
    }
    //  const token=createToken(newUser.userid)
    //     res.cookie('cookie',token,{httpOnly:true,maxAge:1000*60*60*24})
    //     res.status(201).json({userid:newUser.userid})
    
    // catch(e){
    // const errors = handleErrors(e);
    // res.status(400).json({errors});
    // }   
}); 

module.exports =routes