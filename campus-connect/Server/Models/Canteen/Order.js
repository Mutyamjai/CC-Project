const mongoose = require("mongoose");
const Counter = require("../Counter");

const orderSchema = mongoose.Schema({
    order_number: {
        type: Number,
    },
    user_name: {
        type: String,
        required: true
    },
    contact_number: {
        type: Number,
        required: true,
    },
    email: {
        type: String,
        required: true
    },
    payment_method: {
        type: String,
        required: true,
        enum: ["Cash", "Online"]
    },
    status: {
        type: String,
        required: true,
        enum: ["Under_cooking", "Under_delivering" ,"Delivered", "Student_received"]
    },
    total_amount: {
        type: Number,
        required: true
    },
    cart: [
        {
            item_name : {
                type: String,
                required: true
            },
            count: {
                type: Number,
                required: true
            }
        }
    ]
});

orderSchema.pre("save", async function(next) {
    const order = this;
    
    if (!order.isNew) {
        return next();
    }

    try {
        const counter = await Counter.findByIdAndUpdate(
            { _id: "order_number" },
            { $inc: { seq: 1 } },
            { new: true, upsert: true } 
        );

        order.order_number = counter.seq;
        next();
    } catch (err) {
        next(err);
    }
});

module.exports = mongoose.model("Order", orderSchema);