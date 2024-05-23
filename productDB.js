const connectDB = require("./db/connectDB");
const Product = require("./db/schema");
const ProductJson = require("./data.json");
require("dotenv").config();



const startt = async () => {
    try {
        await connectDB();
        await Product.create(ProductJson);
        console.log("Products create successfully");
    } catch (err) {
        console.log(`${err.message}`);
    }
}

startt();
