const { validationResult } = require("express-validator")
const Item = require("../Models/Item")
const User = require("../Models/User")
const Log = require("../Models/Log")

// Adding item
const addItem = async (req, res) => {
    try {
        const error = validationResult(req)
        if (!error.isEmpty()) {
            return res.status(403).send({ errors: error, success: false })
        }
        const { id } = req.user;
        const { name, description, quantity, price, sold, category } = req.body

        const NE = await User.findById(id)
        if (!NE) {
            res.status(403).send({ error: "User Does not exist", success: false })
        }

        const item = await Item.create({
            user: id,
            name: name,
            description: description,
            quantity: quantity,
            price: price,
            sold: sold,
            category: category,
        })
        res.json({ message: "Item succesfully added", success: true })
    } catch (err) {
        console.log(err)
        return res.status(500).send({ errors: err, success: false })
    }
}

// Get all items of perticular user
const getItemsByUser = async (req, res) => {
    try {
        const { id } = req.user;
        const user = await User.findById(id);
        if (!user) {
            return res.status(404).send({ message: 'No such user', success: false })
        }
        const items = await Item.find({
            user: id
        })

        return res.send({
            items: items,
            success: true
        })
    } catch (err) {
        console.log(err)
        return res.status(500).send({ errors: err, success: false })
    }
}

// Get all items of perticular user of perticular category
const getItemsByUserCategory = async (req, res) => {
    try {
        const { id } = req.user;
        const user = await User.findById(id);
        if (!user) {
            return res.status(404).send({ message: 'No such user', success: false })
        }

        const category = req.params.category
        console.log(category)
        const items = await Item.find({
            user: id,
            category: category
        })

        return res.send({
            items: items,
            success: true
        })
    } catch (err) {
        console.log(err)
        return res.status(500).send({ errors: err, success: false })
    }
}

// Get perticular item
const getItem = async (req, res) => {
    try {
        const { id } = req.user;
        const user = await User.findById(id);
        if (!user) {
            return res.status(404).send({ message: 'No such user', success: false })
        }

        const itemid = req.params.id
        const item = await Item.findById(itemid)

        if (!item) {
            return res.status(404).json({ error: "Item does not exist", success: false });
        }
        return res.send({
            item: item,
            success: true
        })
    } catch (err) {
        console.log(err)
        return res.status(500).send({ errors: err, success: false })
    }
}

// Updating Item
const updateItem = async (req, res) => {
    try {
        const { id } = req.user;

        const user = await User.findById(id);
        if (!user) {
            return res.status(404).send({ message: 'No such user', success: false });
        }

        const itemId = req.params.id;

        const item = await Item.findById(itemId);

        if (!item || item.user.toString() !== id) {
            return res.status(404).send({ message: 'Item not found or does not belong to the user', success: false });
        }

        item.name = req.body.name || item.name;
        item.description = req.body.description || item.description;
        item.quantity = req.body.quantity || item.quantity;
        item.price = req.body.price || item.price;
        item.sold = req.body.sold || item.sold;
        item.category = req.body.category || item.category;

        // Save the updated item
        await item.save();

        return res.send({ message: 'Item updated successfully', success: true });
    } catch (err) {
        console.log(err);
        return res.status(500).send({ errors: err, success: false });
    }
};

// Deleting Item
const deleteItem = async (req, res) => {
    try {
        const { id } = req.user;

        const user = await User.findById(id);
        if (!user) {
            return res.status(404).send({ message: 'No such user', success: false });
        }

        const itemId = req.params.id;

        const item = await Item.findById(itemId);

        if (!item || item.user.toString() !== id) {
            return res.status(404).send({ message: 'Item not found or does not belong to the user', success: false });
        }

        await item.remove();

        return res.send({ message: 'Item deleted successfully', success: true });
    } catch (err) {
        console.log(err);
        return res.status(500).send({ errors: err, success: false });
    }
};

const getLogs = async (req, res) => {
    try {
        const { id } = req.user;
        const user = await User.findById(id);
        if (!user) {
            return res.status(404).send({ message: 'No such user', success: false })
        }

        const itemid = req.params.id
        const item = await Item.findById(itemid)
        if (!item) {
            return res.status(404).json({ error: "Item does not exist", success: false });
        }

        const logs = await Log.find({
            item: itemid,
            user: id
        })

        return res.status(200).json({ logs: logs, success: true })
    } catch (err) {
        console.log(err)
        return res.status(500).send({ errors: err, success: false })
    }
}

module.exports = { addItem, getItemsByUser, getItemsByUserCategory, getItem, updateItem, deleteItem, getLogs }