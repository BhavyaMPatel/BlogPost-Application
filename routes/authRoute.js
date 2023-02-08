const { Router }=require('express');
const User = require('../models/User');
const routes =Router();
const jwt=require('jsonwebtoken');
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
        console.log("Hi");
        errors["password"]=err;
    }
    if(err=="User Does Not Exist")
    {
        console.log("Hi");
        errors['userid']=err;
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

routes.post("/SignIn",async (req,res)=>{

    const {userid, password}=req.body;   
    try{
        const user = await User.findOne({userid});
        // console.log(user);
        if(user){
            const input_password = user.password;
            if(input_password===password){
                // return user
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
  
routes.post("/SignUp", async (req, res) => {

    const {userid, email, password}=req.body;   
    console.log(userid, email, password);

    try{
    const user = await User.create({userid,email,password});

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