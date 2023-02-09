const mongoose = require('mongoose');
const userSchema=new mongoose.Schema({
    userid:{
        type: String,
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