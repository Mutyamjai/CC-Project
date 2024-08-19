const mongoose = require("mongoose");

const laundry_order_schema = new mongoose.Schema({
    user_name : {
        type: String,
        required: true,
        trim: true,
    },
    order_number: {
        type: Number,
        required: true,
    },
    status: {
        type: String,
        required: true,
        enum: ["Under_washing", "Ready_to_collect", "Completed"]
    },
    total_price: {
        type: Number,
        required: true,
        default: 0
    },
    total_pieces: {
        type: Number,
        required: true,
    },
    total_washing: {
        type: Number,
        default: 0
    },
    total_dry_cleaning: {
        type: Number,
        default: 0
    },
    total_iron: {
        type: Number,
        default: 0
    },
    washing: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Washing"
    },
    dry_cleaning: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Dry_cleaning"
    },
    iron: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Iron"
    },
    created_at: {
        type: Date,
        default: Date.now()
    }
})

module.exports = mongoose.model("Laundry_Order", laundry_order_schema);