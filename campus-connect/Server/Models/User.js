const mongoose = require("mongoose");

const user_schema = new mongoose.Schema({
    user_name : {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        trim: true,
    },
    contact_number: {
        type: Number,
        required: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
    },
    account_type: {
        type: String,
        required: true,
        enum: ["Student", "Laundry"]
    },
    token: {
        type: String,
    },
    reset_password_expiry_time: {
        type: Date,
    },
    laundry_orders: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Laundry_Order"
        }
    ],
    laundry_account: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Laundry_account"
    }
})

module.exports = mongoose.model("User", user_schema);