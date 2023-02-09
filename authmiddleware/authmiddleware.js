const jwt= require('jsonwebtoken');
const User = require('../models/User');

//middleware function
//authenticate 
const auth = (req,res,next)=>{
const token =req.cookies.cookie;
//it exits or not
if(token){
    jwt.verify(token,'sceret',(err,decoded)=>{
        if(err){
            console.log(err);
            res.redirect('/SignIn');
        }else{
            req.decoded = decoded;
            // console.log(decoded);
            next();
        }
    }); //valied 
}else{
    res.redirect('/SignIn');
}

}
//Decode the Id and Check User
const check=(req,res,next)=>{
    const token = req.cookies.cookie;
    if(token){
        jwt.verify(token,'sceret',async (err,decode) =>{
            if(err){
                console.log(err);
                console.log("I am Error");  
                res.locals.user=null;//value of variable user is null in ejs
                next();
            }else{
                const userid=decode.id;
                let user = await User.findOne({userid});
                res.locals.user=user.userid;
                next();
            }
        })
    }
    else{
        res.locals.user=null;//value of variable user is null in e
        next();
    }
}

module.exports = {auth,check}