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

module.exports = User;