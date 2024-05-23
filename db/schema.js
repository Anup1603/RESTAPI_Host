const mongoose = require("mongoose")

const productSchema = new mongoose.Schema({
    id: {
        type: Number,
        required: [true, "Id is a primary key it should be mention"]
    },
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: [true, "Price should be more then 1"]
    },
    feature: {
        type: Boolean,
        default: false
    },
    company: {
        type: String,
        enum: {
            values: ["apple", "samsung", "realme", "mi"],
            message: `{VALUE} is not supported`
        }
    },
    rating: {
        type: Number,
        required: true,
        default: 4.5
    },

}, { timestamps: true })

const productModel = mongoose.model("Product", productSchema);

module.exports = productModel;