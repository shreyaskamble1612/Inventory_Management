const mongoose = require("mongoose");

const connectToMongo = async (MONGO_URI)=>{
    try{
        await mongoose.connect(MONGO_URI)
        console.log("Connected to MongoDB")
    }catch(err){
        console.log(err)
    }
}

module.exports = connectToMongo