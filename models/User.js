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
        lowecase:true,
    },
    password:{
        type:String,
        required:true
    }

});

const User=mongoose.model('user',userSchema);

userSchema.static.login=async function(userid,password){

    const user = await User.findOne({userid});
    console.log(user);
    if(user){
        const input_password = user.password;
        if(input_password===password){
            return user
        }
        throw Error('Incorrect password');
    }
    throw Error('Incorrect email address');

}

module.exports = User;