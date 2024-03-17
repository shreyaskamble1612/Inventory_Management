const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    name:{
        type:String,
        required:[true,"Please add a name"]
    },
    email: {
        type:String,
        required:[true,"Please add a email"],
        unique: true,
        trim: true,
        match:[
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,"Please enter a valid email"
        ]
    },
    password: {
        type:String,
        required:[true,"Please add a password"],
        minlength: [6,"Password must be up to 6 characters"],
        maxlength: [23,"Password must not be more than 23 characters"],
    },
    photo: {
        type:String,
        required: [true,"Please enter a photo"],
        default:"no-photo"
    },
    phone: {
        type: String,
        default:"+91"
    },
    bio: {
        type: String,
        maxlength:[200,"Bio must not be more than 200 characters"],
        default:"bio"
    },
}, {
    timestamps: true,
}
);

const User = mongoose.model("User",userSchema)
module.exports = User