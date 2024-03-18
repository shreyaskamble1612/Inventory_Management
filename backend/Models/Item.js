const mongoose = require('mongoose')

const {Schema} = mongoose

const ItemSchema = new Schema({
    user:{
        type:Schema.Types.ObjectId,
        required:true,
        ref:'user'
    },
    name:{
        type:String,
        required:true,
        
    },
    description:{
        type: String,
        default:" ",
    },
    quantity:{
        type:Number,
        required:true,
    },
    price:{
        type:Schema.Types.Decimal128,
        required:true,
    },
    sold:{
        type:Number,
        default:0
    },
    category:{
        type:String,
        required:true,

    },
    date:{
        type:Date,
        required:true,
        default: Date.now,
    }
})

const Item = mongoose.model('item',ItemSchema)
module.exports(Item)
