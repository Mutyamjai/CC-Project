const mongoose = require("mongoose");

const laundry_account_schema = new mongoose.Schema({
    
    order_number: {
        type: Number,
        default: 27
    },
    completed_orders: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Laundry_Order"
        }
    ],
    under_washing: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Laundry_Order"
        }
    ],
    ready_to_collect: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Laundry_Order"
        }
    ]
})

module.exports = mongoose.model("Laundry_account", laundry_account_schema);