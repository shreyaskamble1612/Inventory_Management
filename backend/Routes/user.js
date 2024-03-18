const express = require("express");
const router = express.Router();
const { body } = require("express-validator")
const {registerUser, login, updateUser, deleteUser} = require("../Controllers/userControllers");
const fetchuser = require("../Middleware/fetchUser");


router.post("/registerUser", [
    body("name").isString().isLength({ min: 5, max: 30 }).withMessage("Name is required. Minimum length 5 and Maximum 30"),
    body("phoneNo").isMobilePhone().withMessage("Mobile phone number is required"),
    body("email").isEmail().withMessage("Email is required"),
    body("password").isLength({ min: 8 }).withMessage("Password should be 8 length")
], registerUser)

router.post("/login",[
    body("email").isEmail().withMessage("Email is required"),
    body("password").isLength({min:8}).withMessage("Password is required")
],login)

router.put("/updateUser",fetchuser,updateUser)
router.delete("/deleteUser",fetchuser,deleteUser)

module.exports = router