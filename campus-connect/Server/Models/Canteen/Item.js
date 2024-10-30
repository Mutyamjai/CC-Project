const mongoose = require("mongoose");

const itemSchema = mongoose.Schema({
    item_name: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true,
        default: "Not_available",
        enum: ["Availabe", "Not_available"]
    },
    category: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    image: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model("Item", itemSchema);