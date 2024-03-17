const registerUser = (req,res) => {
    if(!req.body.email){
        res.status(400)
        throw new Error("Please add an email");
    }
    res.send("Register User ")
};

const registerUser = async(req,res) => {
    try{

    }catch(error){

    }
};
module.exports = {
    registerUser,

}