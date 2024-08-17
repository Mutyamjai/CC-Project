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
    reset_password_expiry_time: {
        type: Date,
    }
})

module.exports = mongoose.model("User", user_schema);