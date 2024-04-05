const { validationResult } = require("express-validator")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const User = require("../Models/User");

const JWT_SECRET = process.env.JWT_SECRET;


const registerUser = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(403).send({ errors: errors, success: false })
        }
        const { name, email, password, phoneNo } = req.body;

        const al = await User.findOne({ email: email })
        if (al) {
            res.status(403).send({ errors: "User already exists", success: false })
        }

        const salt = await bcrypt.genSalt(10);
        const secPass = await bcrypt.hash(password, salt);
        const user = await User.create({
            name: name,
            email: email,
            phoneNo: phoneNo,
            password: secPass
        })
        const data = {
            user: {
                id: user.id,
            },
        };
        console.log(JWT_SECRET)
        const authtoken = jwt.sign(data, JWT_SECRET);
        success = true;
        res.json({ authtoken: authtoken, success: true });
    } catch (err) {
        console.log(err)
        return res.status(500).send({ errors: err, success: false })
    }
}

const login = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(403).send({ errors: errors, success: false })
        }
        const { email, password } = req.body

        const user = await User.findOne({ email: email })
        if (!user) {
            return res.status(404).send({ errors: "User not found", success: false })
        }
        console.log(user)
        const passwordcompare = await bcrypt.compare(password, user.password);
        if(!passwordcompare){
            return res.status(400).send( {errors: "Invalid Password",success:false})
        }

        const data = {
            user: {
                id: user.id,
            },
        };
        const authtoken = jwt.sign(data, JWT_SECRET);
        success = true;
        res.json({ authtoken: authtoken, success: true });
    } catch (err) {
        console.log(err);
        return res.status(500).send({ errors: err, success: false })
    }
}

const updateUser = async (req, res) => {
    try {
        const { id } = req.user;
        const { name, email, phoneNo } = req.body;

        const user = await User.findById(id);
        if (!user) {
            return res.status(404).send({ errors: "User not found", success: false });
        }

        if (name) user.name = name;
        if (email) user.email = email;
        if (phoneNo) user.phoneNo = phoneNo;

        await user.save();
        res.json({ message: "User updated successfully", success: true });
    } catch (err) {
        console.error(err);
        res.status(500).send({ errors: err.message, success: false });
    }
};

const deleteUser = async (req, res) => {
    try {
        const { id } = req.user;

        const user = await User.findById(id);
        if (!user) {
            return res.status(404).send({ errors: "User not found", success: false });
        }

        await User.findByIdAndDelete(id);
        res.json({ message: "User deleted successfully", success: true });
    } catch (err) {
        console.error(err);
        res.status(500).send({ errors: err.message, success: false });
    }
};

module.exports = {
    registerUser, login,updateUser,deleteUser
}