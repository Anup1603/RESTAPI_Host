const mongoose = require("mongoose");
require("dotenv").config();

const connectDB = async () => {
    await mongoose.connect(process.env.MONGODB_URI).then(() => {
        console.log(`MongoDB is connected successfully`)
    }).catch((err) => {
        console.log(`DB are not connected ${err.message}`);
    })
}

module.exports = connectDB;