const {validationResult} = require("express-validator")
const Item = require("../Models/Item")
const User = require("../Models/User")
const Log = require("../Models/Log")

// Increase Quantity
const increaseQuantity = async(req,res)=>{
    try{
        const error = validationResult(req)
        if(!error.isEmpty()){
            return res.status(403).send({errors:error,success:false})
        }
        const {id} = req.user;
        const user = await User.findById(id)
        if(!user){
            return res.status(404).send({error:"User Does not exist",success:false})
        }
        const {quantity,description} = req.body;
        const itemId = req.params.id;
        const item = await Item.findById(itemId);
        if(!item){
            return  res.status(404).json({error:"Item does not exist",success:false})
        }

        item.quantity = item.quantity+quantity
        await item.save()
        let log = await Log.create({
            user:id,
            item:itemId,
            quantity:quantity,
            action:"Increase Quantity",
            description:description
        })

        return  res.send({
            log:log,success:true
        })

    }catch(err){
        console.log(err);
        return res.status(500).send({error:err.message,success:false});
    }
}

// Decrease Quantity
const decreaseQuantity = async(req,res)=>{
    try{
        const error = validationResult(req)
        if(!error.isEmpty()){
            return res.status(403).send({errors:error,success:false})
        }
        const {id} = req.user;
        const user = await User.findById(id)
        if(!user){
            return res.status(404).send({error:"User Does not exist",success:false})
        }
        const {quantity,description} = req.body;
        const itemId = req.params.id;
        const item = await Item.findById(itemId);
        if(!item){
            return  res.status(404).json({error:"Item does not exist",success:false})
        }


        item.sold += Math.min(quantity,item.quantity)
        item.soldPrice = item.sold*item.price
        if(item.quantity>=quantity){
            item.quantity = item.quantity-quantity
        }else{
            item.quantity = 0
        }

        await item.save()
        let log = await Log.create({
            user:id,
            item:itemId,
            quantity:quantity,
            action:"Decrease Quantity",
            description:description
        })

        return  res.send({
            log:log,success:true
        })

    }catch(err){
        console.log(err);
        return res.status(500).send({error:err.message,success:false});
    }
}


module.exports = {increaseQuantity,decreaseQuantity}