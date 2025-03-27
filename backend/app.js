const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const connectToMongo = require("./db");

require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

// ✅ Apply CORS Middleware Correctly
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://inventory-management-three-virid.vercel.app",
    ],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authtoken"],
    credentials: true, // Required if using cookies/auth headers
  })
);

// ❌ Remove the conflicting manual CORS header
// app.use((req, res, next) => {
//   res.setHeader("Access-Control-Allow-Origin", "*");
//   next();
// });

app.use(bodyParser.json());

// ✅ Ensure OPTIONS requests are handled correctly
app.options("*", cors());

app.use("/api/user", require("./Routes/user"));
app.use("/api/item", require("./Routes/item"));
app.use("/api/log", require("./Routes/log"));
app.use("/api/auth", require("./Routes/auth"));

app.get("/", (req, res) => {
  res.send("Welcome to Inventory Management");
});

const start = async () => {
  try {
    await connectToMongo(MONGO_URI);
    app.listen(PORT, () => {
      console.log("Server is running on port " + PORT);
    });
  } catch (err) {
    console.log(err);
  }
};

start();
