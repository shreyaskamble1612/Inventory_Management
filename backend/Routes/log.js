const express = require("express")
const router = express.Router()
const fetchuser = require("../Middleware/fetchUser")
const { increaseQuantity, decreaseQuantity } = require("../Controllers/logControllers")
const { body } = require("express-validator")

router.post("/increaseQuantity/:id", fetchuser, [
    body("quantity").isNumeric().withMessage("Please enter a valid number."),
    body("description").isString().withMessage("Description must be a string.")], increaseQuantity)

router.post("/decreaseQuantity/:id", fetchuser, [
    body("quantity").isNumeric().withMessage("Please enter a valid number."),
    body("description").isString().withMessage("Description must be a string.")], decreaseQuantity)

module.exports = router