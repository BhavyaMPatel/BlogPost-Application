const mongoose = require('mongoose');
const userSchema=new mongoose.Schema({
    userid:{
        type: String,
        required: [true,"Enter a Valid userId"],
        unique: [true,"Please Enter Unique UserId"]
    },
    email:{
        type:String,
        required:true,
        lowecase:true
    },
    password:{
        type:String,
        required:true
    }

});

const User=mongoose.model('user',userSchema);
//After SignUp 
userSchema.post('save',function(doc,next){
    console.log('Successfully Signed Up',doc);
    next();
})

userSchema.pre('save',function(doc,next){
    console.log('Successfully',this);
    next();
})

module.exports = User;