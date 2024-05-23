const express = require("express");
const connectDB = require("./db/connectDB");
const bodyParser = require("body-parser");
const product_route = require("./routes/route");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 8000;


app.get("/", (req, res) => {
    res.send("<h1>Connected to web server</h1>")
})

// MIDDLE-WARE
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }));

// Router
app.use("/api/products", product_route)


const start = async () => {
    try {
        await connectDB();

        app.listen(PORT, () => {
            console.log(`Server is connected successfully @ http://localhost:${PORT}`)
        })
    } catch (err) {
        console.log(`ERROR: ${err.message}`);
    }
}

start();