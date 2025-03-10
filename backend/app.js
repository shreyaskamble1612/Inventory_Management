const express = require("express")
const cors = require("cors")
const bodyParser = require("body-parser");
const connectToMongo = require("./db");

require("dotenv").config()

const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

app.use(cors({
    origin:["http://localhost:5173/","https://inventory-management-x54z.onrender.com"],
    credentials:true,
}))
app.use(bodyParser.json())

app.use("/api/user",require("./Routes/user"))
app.use("/api/item",require("./Routes/item"))
app.use("/api/log",require("./Routes/log"))
app.use("/api/auth",require("./Routes/auth"))
app.get("/", (req, res) => {
    res.send("Hello Shreyas")
})

const start = async () => {
    try {
        await connectToMongo(MONGO_URI);
        app.listen(PORT, () => {
            console.log("Server is running on port " + PORT)
        })
    } catch (err) {
        console.log(err)
    }
}

start()