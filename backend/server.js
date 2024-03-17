const dotenv = require("dotenv").config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require("cors");
const userRoute = require('./routes/userRoute')
const errorHandler = require('./middleware/errorMiddleware')

const app = express();
//Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors())

//Routes middlware
app.use("/api/users", userRoute);

//Routes
app.get("/", (req, res) => {
    res.send("Home Page");
})
//Errormiddlware
app.use(errorHandler)
const PORT = process.env.PORT || 5000;

//Connect to mongo-db and start seerver

mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);

        })
    })
    .catch((err) => console.log(err));

