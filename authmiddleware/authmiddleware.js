const jwt= require('jsonwebtoken');
//middleware function
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


module.exports = {auth}