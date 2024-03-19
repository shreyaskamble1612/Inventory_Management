const express = require("express")
const router = express.Router()
const fetchuser = require("../Middleware/fetchUser")
const { addItem, getItemsByUser, getItemsByUserCategory, getItem, updateItem,deleteItem, getLogs } = require("../Controllers/itemControllers")
const { body } = require("express-validator")

router.post("/addItem", fetchuser, [
    body("name").isString().withMessage("Name is required"),
    body("price").isDecimal().withMessage("Price required"),
    body("category").isString().withMessage("Category required"),
    body("quantity").isNumeric().withMessage("Quantity is required")
], addItem)

router.get("/getItemsByUser", fetchuser, getItemsByUser);
router.get("/getItemsByUserCategory/:category", fetchuser, getItemsByUserCategory);
router.get("/getItem/:id", fetchuser, getItem);
router.get("/getLogs/:id", fetchuser, getLogs);
router.put("/updateItem/:id", fetchuser, updateItem)
router.delete("/deleteItem/:id", fetchuser, deleteItem)

module.exports = router