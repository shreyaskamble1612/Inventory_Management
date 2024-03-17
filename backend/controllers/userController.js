const registerUser = (req,res) => {
    if(!req.body.email){
        res.status(400).send({error:"Please add an email"})
    
    }
    res.send("Register User ")
};
module.exports = {
    registerUser,

}