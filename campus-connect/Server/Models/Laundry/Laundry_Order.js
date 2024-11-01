const mongoose = require("mongoose");
const Counter = require("../Counter");

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
        enum: ["Under_washing", "Ready_to_collect", "Payment_done" , "Completed"]
    },
    paid_in: {
        type: String,
        enum: ["Cash", "Online"]
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

laundry_order_schema.pre("save", async function(next) {
    const order = this;

    if (!order.isNew) {
        return next();
    }

    try {
        const counter = await Counter.findOneAndUpdate(
            { name: "laundry_order_number" },
            { $inc: { seq: 1 } },
            { new: true, upsert: true } 
        );

        next();
    } catch (err) {
        next(err);
    }
});

module.exports = mongoose.model("Laundry_Order", laundry_order_schema);