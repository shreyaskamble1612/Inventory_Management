const mongoose = require("mongoose");
const {Schema} = mongoose

const UserSchema = new Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    phoneNo:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true,
    },
    date:{
        type:Date,
        required:true,
        default:Date.now
    },
    resetToken:{
        type:String,
    },
    resetTokenExpire:{
        type:Date,
    },
})

const User = mongoose.model("user",UserSchema);
module.exports = User; 