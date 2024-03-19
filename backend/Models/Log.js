const mongoose = require('mongoose')

const {Schema} = mongoose

const LogSchema = new Schema({
    user:{
        type:Schema.Types.ObjectId,
        required:true,
        ref:'user'
    },
    item:{
        type:Schema.Types.ObjectId,
        required:true,
        ref:'item'
    },
    action:{
        type:String,
        required:true
    },
    quantity:{
        type:Number,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    date:{
        type:Date,
        required:true,
        default: Date.now,
    }
})

const Log = mongoose.model('log',LogSchema);
module.exports = Log